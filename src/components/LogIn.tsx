import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    padding: `${theme.spacing(12)} ${theme.spacing(8)}`,
    display: 'flex',
    flexDirection: 'column',
  },
  gutterBottom: {
    marginBottom: theme.spacing(4),
  },
}));

const LogIn = () => {
  const classes = useStyles();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      signIn();
    }
  };

  return (
    <Paper className={classes.root}>
      <Box className={classes.gutterBottom} display='flex' justifyContent='center'>
        <Image height={34} src={'/trak_logo.svg'} width={124} />
      </Box>
      <GoogleButton label='Logg inn med Google' onClick={() => signIn()} onKeyDown={(e) => handleKeyDown(e)} type='light' />
    </Paper>
  );
};

LogIn.displayName = 'LogIn';

export default LogIn;
