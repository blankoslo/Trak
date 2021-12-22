import AddTaskIcon from '@mui/icons-material/AddTask';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Avatar, Button, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
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
                <Button color='inherit' startIcon={<AddTaskIcon color='primary' />} variant='text'>
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
