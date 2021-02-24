import { makeStyles } from '@material-ui/core';
import SearchFilter from 'components/SearchFilter';
import Typo from 'components/Typo';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const useStyles = makeStyles({
  root: {
    marginLeft: '30px',
    marginTop: '60px',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    lineHeight: 0.7,
  },
  template_title: {
    marginLeft: '3px',
  },
});

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

const ProcessTemplate = () => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Mine oppgaver</title>
      </Head>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typo className={classes.title} variant='h1'>
            Mine oppgaver
          </Typo>
          <Typo className={classes.template_title}>Aktive oppgaver</Typo>
        </div>
        <SearchFilter />
      </div>
    </>
  );
};

export default ProcessTemplate;
