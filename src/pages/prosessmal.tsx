import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import AddButton from 'components/AddButton';
import Phase from 'components/views/prosessmal/Phase';
import PhaseModal from 'components/views/prosessmal/PhaseModal';
import { DataProvider } from 'context/Data';
import { trakClient } from 'lib/prisma';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { IPhase } from 'utils/types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query?.prosess) {
    return {
      redirect: {
        permanent: false,
        destination: '/prosessmal?prosess=lopende',
      },
      props: {},
    };
  }
  await trakClient.process_template.createMany({
    data: [
      { title: 'Onboarding', slug: 'onboarding' },
      { title: 'Løpende', slug: 'lopende' },
      { title: 'Offboarding', slug: 'offboarding' },
    ],
    skipDuplicates: true,
  });

  const processTemplateQuery = await trakClient.process_template.findUnique({
    where: {
      slug: context.query.prosess.toString(),
    },
    include: {
      phases: {
        orderBy: [
          {
            due_date_day_offset: 'asc',
          },
          {
            due_date: 'asc',
          },
        ],
        where: {
          active: {
            equals: true,
          },
        },
        select: {
          id: true,
          title: true,
          process_template_id: true,
          tasks: {
            orderBy: {
              created_at: 'asc',
            },
            where: {
              global: true,
              active: true,
            },
            select: {
              id: true,
              title: true,
              description: true,
              responsible_type: true,
              link: true,
              professions: {
                select: {
                  title: true,
                  slug: true,
                },
              },
              responsible: {
                select: {
                  first_name: true,
                  last_name: true,
                  image_url: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const process_template = {
    ...processTemplateQuery,
    phases: processTemplateQuery.phases.map((phase) => {
      return {
        ...phase,
        tasks: phase.tasks.map((task) => {
          return { ...task, professions: task.professions };
        }),
      };
    }),
  };

  return { props: { process_template } };
};

const useStyles = makeStyles((theme: Theme) => ({
  activeOption: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textDecoration: 'underline',
    cursor: 'pointer',
    textDecorationColor: theme.palette.primary.main,
    textUnderlineOffset: '8px',
  },
  option: {
    fontSize: '1rem',
    cursor: 'pointer',
  },
  divider: {
    color: theme.palette.primary.main,
    fontSize: '1.25rem',
  },
  rootSelector: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
}));

const ProcessTemplateSelector = ({ process_template }) => {
  const router = useRouter();
  const classes = useStyles();
  const options = [
    { title: 'Onboarding', slug: 'onboarding' },
    { title: 'Løpende', slug: 'lopende' },
    { title: 'Offboarding', slug: 'offboarding' },
  ];
  return (
    <Stack className={classes.rootSelector} direction='row' spacing={2}>
      {options.map((value, index) => (
        <Fragment key={value.title}>
          <Typography
            className={value.slug === process_template.slug ? classes.activeOption : classes.option}
            key={value.slug}
            onClick={() =>
              router.push({
                pathname: '/prosessmal',
                query: { ...router.query, prosess: value.slug },
              })
            }
          >
            {value.title}
          </Typography>
          {index < options.length - 1 && <Typography className={classes.divider}>/</Typography>}
        </Fragment>
      ))}
    </Stack>
  );
};

const ProcessTemplate = ({ process_template }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>Prosessmal {process_template && `- ${process_template.title}`}</title>
      </Head>
      <Container maxWidth='lg' sx={{ marginTop: '16px' }}>
        <Box display='flex' justifyContent='flex-end' mb={4}>
          <ProcessTemplateSelector process_template={process_template} />
        </Box>
        <DataProvider>
          {process_template?.phases.map((phase: IPhase) => (
            <Phase key={phase.id} phase={phase} processTemplate={process_template} />
          ))}
        </DataProvider>
        <AddButton onClick={() => setModalIsOpen(true)} text='Legg til fase' />
        <div style={{ marginBottom: '24px' }} />
        {modalIsOpen && <PhaseModal closeModal={() => setModalIsOpen(false)} modalIsOpen={modalIsOpen} processTemplate={process_template} />}
      </Container>
    </>
  );
};

export default ProcessTemplate;
