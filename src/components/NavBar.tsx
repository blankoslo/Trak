import AddTaskIcon from '@mui/icons-material/AddTask';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import { useUser } from 'context/User';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerVertically: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { user } = useUser();
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

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
                <Button color='inherit' href='/prosessmal' startIcon={<AddTaskIcon color='primary' />} variant='text'>
                  Ny oppgave
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
