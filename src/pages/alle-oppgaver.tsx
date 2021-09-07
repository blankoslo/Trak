import 'moment/locale/nb';

import PageTitle from 'components/PageTitle';
import SearchFilter from 'components/SearchFilter';
import Typo from 'components/Typo';
import Filter from 'components/views/mine-oppgaver/Filter';
import TimeSection from 'components/views/mine-oppgaver/TimeSection';
import { trakClient } from 'lib/prisma';
import moment from 'moment';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { IEmployeeTask, ITag } from 'utils/types';
import { filterAndSearchTasks, splitIntoTimeSections } from 'utils/utils';
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { fullfort: completed } = query;
  const isCompleted = completed.toString() === 'true';
  const myTasksQuery = await trakClient.employeeTask.findMany({
    where: {
      completed: isCompleted,
      ...(isCompleted && {
        dueDate: {
          gte: moment().startOf('day').toDate(),
        },
      }),
    },
    orderBy: {
      dueDate: 'asc',
    },
    select: {
      id: true,
      dueDate: true,
      completed: true,
      responsible: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          imageUrl: true,
        },
      },
      employee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          imageUrl: true,
        },
      },
      task: {
        select: {
          id: true,
          title: true,
          link: true,
          tags: true,
          phase: {
            select: {
              processTemplate: {
                select: {
                  title: true,
                  slug: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const myTasks = JSON.parse(safeJsonStringify(myTasksQuery));

  return { props: { myTasks } };
};

export type TimeSectionType = {
  title?: string;
  date?: string;
  data: IEmployeeTask[];
  error?: boolean;
  defaultOpen?: boolean;
};

const MyTasks = ({ myTasks }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { fullfort: completed } = router.query;

  const timeSections: TimeSectionType[] = splitIntoTimeSections(myTasks);

  const [searchString, setSearchString] = useState('');

  const [choosenProcessTemplates, setChoosenProcessTemplates] = useState<string[]>([]);
  const [choosenTags, setChoosenTags] = useState<ITag[]>([]);

  const filterResult = useMemo(() => {
    return filterAndSearchTasks(searchString, { tags: choosenTags, processTemplates: choosenProcessTemplates }, timeSections, true);
  }, [searchString, choosenTags, choosenProcessTemplates, myTasks]);

  return (
    <>
      <Head>
        <title>Alle oppgaver</title>
      </Head>
      <>
        <PageTitle subtitle={`${completed.toString() === 'true' ? 'Fullførte' : 'Aktive'} oppgaver`} title='Alle oppgaver' />

        <SearchFilter
          activeFilters={Boolean(choosenTags.length || choosenProcessTemplates.length)}
          filterComponent={
            <Filter
              choosenProcessTemplates={choosenProcessTemplates}
              choosenTags={choosenTags}
              setChoosenProcessTemplates={setChoosenProcessTemplates}
              setChoosenTags={setChoosenTags}
            />
          }
          search={setSearchString}
        />
        <div>
          {!timeSections.length ? (
            <Typo>Ingen oppgaver</Typo>
          ) : (
            (filterResult.length ? filterResult : timeSections).map((section: TimeSectionType, index: number) => {
              return <TimeSection index={index} key={index} section={section} />;
            })
          )}
        </div>
      </>
    </>
  );
};

export default MyTasks;
