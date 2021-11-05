import { Box, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LogIn from 'components/LogIn';
import Sidebar from 'components/Sidebar';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import urls from 'URLS';

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

/**
 * @typedef {object} LayoutProps
 * @property {JSX.Element} children
 */
export type LayoutProps = {
  children: JSX.Element;
};

/**
 * Setting the overall layout for the application
 * @param {LayoutProps} params
 * @returns Layout
 */
const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  const [session, loading] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (session?.user) {
        if (router.pathname === '/' || router.pathname === '/#') {
          router.push(urls[0].links[0].link);
        }
      } else {
        router.push('/');
      }
    }
  }, [loading, session?.user]);
  return (
    <>
      {session?.user ? (
        <Box display='flex'>
          <Sidebar />
          <Box className={classes.root} flexGrow={1} role='main'>
            {children}
          </Box>
        </Box>
      ) : (
        <Box className={classes.center} display='flex' justifyContent='center'>
          <LogIn />
        </Box>
      )}
    </>
  );
};

export default Layout;
