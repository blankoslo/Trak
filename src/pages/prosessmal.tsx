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
import { Fragment, useEffect, useState } from 'react';
import { IPhase } from 'utils/types';
export const getServerSideProps: GetServerSideProps = async () => {
  await trakClient.processTemplate.createMany({
    data: [
      { title: 'Onboarding', slug: 'onboarding' },
      { title: 'Løpende', slug: 'lopende' },
      { title: 'Offboarding', slug: 'offboarding' },
    ],
    skipDuplicates: true,
  });

  const processTemplates = await trakClient.processTemplate.findMany({
    orderBy: {
      title: 'asc',
    },
    include: {
      phases: {
        orderBy: [
          {
            dueDateDayOffset: 'asc',
          },
          {
            dueDate: 'asc',
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
          processTemplateId: true,
          tasks: {
            orderBy: {
              createdAt: 'asc',
            },
            where: {
              global: true,
              active: true,
            },
            select: {
              id: true,
              title: true,
              description: true,
              link: true,
              professions: true,
              responsible: {
                select: {
                  firstName: true,
                  lastName: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return { props: { processTemplates } };
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

const ProcessTemplateSelector = ({ active, onClick }) => {
  const classes = useStyles();
  const options = [
    { title: 'Løpende', slug: 'lopende' },
    { title: 'Offboarding', slug: 'offboarding' },
    { title: 'Onboarding', slug: 'onboarding' },
  ];
  return (
    <Stack className={classes.rootSelector} direction='row' spacing={2}>
      {options.map((value, index) => (
        <Fragment key={value.title}>
          <Typography className={index === active ? classes.activeOption : classes.option} key={value.slug} onClick={() => onClick(index)}>
            {value.title}
          </Typography>
          {index < options.length - 1 && <Typography className={classes.divider}>/</Typography>}
        </Fragment>
      ))}
    </Stack>
  );
};

const ProcessTemplate = ({ processTemplates }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedProcessTemplate, setSelectedProcessTemplate] = useState(0);
  const [processTemplate, setProcessTemplate] = useState(processTemplates[selectedProcessTemplate]);

  useEffect(() => {
    setProcessTemplate(processTemplates[selectedProcessTemplate]);
  }, [selectedProcessTemplate]);

  useEffect(() => {
    setProcessTemplate(processTemplates[selectedProcessTemplate]);
  }, [processTemplates]);
  return (
    <>
      <Head>
        <title>Prosessmal {processTemplate && `- ${processTemplate.title}`}</title>
      </Head>
      <Container maxWidth='lg' sx={{ marginTop: '16px' }}>
        <Box display='flex' justifyContent='flex-end' mb={4}>
          <ProcessTemplateSelector active={selectedProcessTemplate} onClick={setSelectedProcessTemplate} />
        </Box>
        <DataProvider>
          {processTemplate?.phases.map((phase: IPhase) => (
            <Phase key={phase.id} phase={phase} processTemplate={processTemplate} />
          ))}
        </DataProvider>
        <AddButton onClick={() => setModalIsOpen(true)} text='Legg til fase' />
        <div style={{ marginBottom: '24px' }} />
        {modalIsOpen && <PhaseModal closeModal={() => setModalIsOpen(false)} modalIsOpen={modalIsOpen} processTemplate={processTemplate} />}
      </Container>
    </>
  );
};

export default ProcessTemplate;
