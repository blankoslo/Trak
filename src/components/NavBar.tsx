import AddTaskIcon from '@mui/icons-material/AddTask';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import NightlightIcon from '@mui/icons-material/Nightlight';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import NotificationsMenu from 'components/NotificationsMenu';
import { useColorMode } from 'context/ColorMode';
import { useUser } from 'context/User';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from 'utils/utils';

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
  const [anchorElUserMenu, setAnchorElUserMenu] = useState<null | HTMLElement>(null);
  const [anchorElNotificationMenu, setAnchorElNotificationMenu] = useState<null | HTMLElement>(null);
  const userMenuOpen = Boolean(anchorElUserMenu);
  const notificationMenuOpen = Boolean(anchorElNotificationMenu);
  const { mode, toggleColorMode } = useColorMode();

  const { data } = useSWR('/api/meta/notification', fetcher);
  const handleColorMode = () => {
    toggleColorMode();
  };

  const handleClickUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUserMenu(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUserMenu(null);
  };

  const handleClickNotificationMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNotificationMenu(event.currentTarget);
  };
  const handleCloseNotificationMenu = () => {
    setAnchorElNotificationMenu(null);
  };
  const router = useRouter();
  return (
    <Box>
      <AppBar color='transparent' position='static'>
        <Toolbar className={classes.root}>
          <Stack className={classes.centerVertically} direction='row' spacing={1}>
            <Button
              aria-controls={userMenuOpen ? 'basic-menu' : undefined}
              aria-expanded={userMenuOpen ? 'true' : undefined}
              aria-haspopup='true'
              color='inherit'
              onClick={handleClickUserMenu}
            >
              <Avatar alt={`${user?.first_name} ${user?.last_name}`} src={user?.image_url} sx={{ marginRight: 1 }} />

              <Typography variant='body2'>
                {user?.first_name} {user?.last_name}
              </Typography>
              <ArrowDropDownIcon />
            </Button>
            <Menu
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorEl={anchorElUserMenu}
              id='basic-menu'
              onClose={handleCloseUserMenu}
              open={userMenuOpen}
            >
              <MenuItem onClick={handleColorMode}>
                <ListItemIcon>{mode === 'dark' ? <WbSunnyIcon color='primary' /> : <NightlightIcon color='primary' />}</ListItemIcon>
                <ListItemText>{mode === 'dark' ? 'Light mode' : 'Dark mode'}</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => signOut()}>
                <ListItemIcon>
                  <LogoutIcon color='primary' />
                </ListItemIcon>
                <ListItemText>Logg ut</ListItemText>
              </MenuItem>
            </Menu>
            <Badge badgeContent={data?.unreadNotifications} color='primary'>
              <IconButton color='inherit' onClick={handleClickNotificationMenu} sx={{ padding: 0 }}>
                <NotificationsNoneIcon />
              </IconButton>
            </Badge>
            {notificationMenuOpen && (
              <NotificationsMenu anchorEl={anchorElNotificationMenu} onClose={handleCloseNotificationMenu} open={notificationMenuOpen} user={user} />
            )}
          </Stack>
          <Stack direction='row' spacing={1}>
            {!isSmallScreen && (
              <>
                <Link href='/' passHref>
                  <Button
                    className={router.asPath === '/' || router.asPath === '/ansatt' ? classes.activeLink : null}
                    color='inherit'
                    startIcon={<HomeIcon color='primary' />}
                    variant='text'
                  >
                    Hjem
                  </Button>
                </Link>
                <Link href='/prosessmal' passHref>
                  <Button
                    className={router.asPath === '/prosessmal' ? classes.activeLink : null}
                    color='inherit'
                    startIcon={<AddTaskIcon color='primary' />}
                    variant='text'
                  >
                    Prosessmal
                  </Button>
                </Link>
                <Link href='/innstillinger' passHref>
                  <Button color='inherit' startIcon={<SettingsIcon color='primary' />} variant='text'>
                    Innstillinger
                  </Button>
                </Link>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
