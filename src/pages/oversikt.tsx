import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from 'components/Avatar';
import SearchField from 'components/SearchField';
import EmployeeCard from 'components/views/employees/EmployeeCard';
import { trakClient } from 'lib/prisma';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { MineAlleToggle } from 'pages/index';
import safeJsonStringify from 'safe-json-stringify';
import { getToday } from 'utils/date';
import { IEmployee } from 'utils/types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query?.mine) {
    return {
      redirect: {
        permanent: false,
        destination: '/oversikt?mine=true',
      },
      props: {},
    };
  }

  const my = context.query?.mine === 'true';

  // Does it make sense to implement search?
  // const search = context.query?.search;

  const session = await getSession(context);

  const hr_managers_query = await trakClient.employee.findMany({
    where: {
      AND: [
        {
          employees: {
            some: {
              id: {
                not: {
                  equals: undefined,
                },
              },
            },
          },
        },
        {
          ...(my && {
            hrManagerId: parseInt(session?.user?.id) || null,
          }),
        },
      ],
    },
    orderBy: [
      {
        firstName: 'desc',
      },
      {
        lastName: 'desc',
      },
    ],
  });

  const hr_manager_with_employees = await Promise.all(
    hr_managers_query.map(async (manager) => {
      const employees = await trakClient.employee.findMany({
        include: {
          profession: true,
        },
        where: {
          AND: [
            {
              hrManagerId: manager.id,
            },
            {
              OR: [
                {
                  terminationDate: {
                    gt: getToday(),
                  },
                },
                {
                  terminationDate: {
                    equals: null,
                  },
                },
              ],
            },
          ],
        },
      });
      return {
        ...manager,
        employees: employees,
      };
    }),
  );

  const hr_managers = JSON.parse(safeJsonStringify(hr_manager_with_employees));

  const selectedOption = my ? selectedOptionEnum.Mine : selectedOptionEnum.Alle;

  return { props: { hr_managers, selectedOption } };
};

export enum selectedOptionEnum {
  Mine,
  Alle,
}

const Overview: NextPage = ({ hr_managers, selectedOption }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '16px auto',
        width: { xs: '90%', sm: '90%', md: '50%' },
      }}
    >
      <Stack direction='row' spacing={2}>
        <MineAlleToggle selectedOption={selectedOption} />
      </Stack>
      <SearchField
        defaultValue={router.query.search}
        onChange={(e) => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, search: e.target.value.toLowerCase() },
          });
        }}
        placeholder='Søk etter tittel, ansatt...'
      />
      <Stack direction='column' spacing={1}>
        {hr_managers.map((hr_manager: IEmployee) => (
          <Stack key={hr_manager.id} padding={2} spacing={1}>
            <Stack alignItems='center' direction='row' spacing={1}>
              <Avatar firstName={hr_manager.firstName} lastName={hr_manager.lastName} src={hr_manager.imageUrl} />
              <Typography variant='h4'>{`${hr_manager.firstName} ${hr_manager.lastName}`}</Typography>
            </Stack>
            {hr_manager.employees.map((employee) => (
              <EmployeeCard
                firstName={employee.firstName}
                gender={employee.gender}
                id={employee.id}
                imageUrl={employee.imageUrl}
                key={employee.id}
                lastName={employee.lastName}
                nrOfMyTasks={undefined}
                processTemplate={'lopende'}
                role={employee.profession.title}
              />
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
export default Overview;
