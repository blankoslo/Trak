import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import BottomBar from 'components/BottomBar';
import LogIn from 'components/LogIn';
import NavBar from 'components/NavBar';
import { useSession } from 'next-auth/react';

const useStyles = makeStyles((theme: Theme) => ({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
  root: {
    marginLeft: '30px',
    marginRight: '30px',
    marginTop: '60px',
    marginBottom: '30px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '10px',
    },
  },
}));

export type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  const { data: session } = useSession();
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <>
      {session?.user ? (
        <>
          <NavBar />
          {children}
          {isSmallScreen && <BottomBar />}
        </>
      ) : (
        <Box className={classes.center} display='flex' justifyContent='center'>
          <LogIn />
        </Box>
      )}
    </>
  );
};

export default Layout;
