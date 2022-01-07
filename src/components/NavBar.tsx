import AddTaskIcon from '@mui/icons-material/AddTask';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Avatar, Button, Stack, Theme, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useUser } from 'context/User';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerVertically: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeLink: {
    textDecoration: 'underline',
    cursor: 'pointer',
    textDecorationColor: theme.palette.primary.main,
    textUnderlineOffset: '8px',
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { user } = useUser();
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const router = useRouter();
  return (
    <Box>
      <AppBar color='transparent' position='static'>
        <Toolbar className={classes.root}>
          <Stack className={classes.centerVertically} direction='row' spacing={1}>
            <Avatar alt={`${user?.firstName} ${user?.lastName}`} src={user?.imageUrl} />

            <Typography style={{ textDecoration: 'underline' }} variant='body2'>
              {user?.firstName} {user?.lastName}
            </Typography>
          </Stack>
          <Stack direction='row' spacing={1}>
            {!isSmallScreen && (
              <>
                <Button
                  className={router.asPath === '/' || router.asPath === '/ansatt' ? classes.activeLink : null}
                  color='inherit'
                  href='/'
                  startIcon={<HomeIcon color='primary' />}
                  variant='text'
                >
                  Hjem
                </Button>
                <Button
                  className={router.asPath === '/prosessmal' ? classes.activeLink : null}
                  color='inherit'
                  href='/prosessmal'
                  startIcon={<AddTaskIcon color='primary' />}
                  variant='text'
                >
                  Prosessmal
                </Button>
                <Button color='inherit' startIcon={<SettingsIcon color='primary' />} variant='text'>
                  Innstillinger
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
