import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Menu from '@mui/icons-material/Menu';
import { Badge, Box, Button, Divider, Drawer as MuiDrawer, Hidden, IconButton, List, ListItem, ListItemText, Skeleton, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import classnames from 'classnames';
import Avatar from 'components/Avatar';
import Toggle from 'components/Toggle';
import Typo from 'components/Typo';
import { useColorMode } from 'context/ColorMode';
import { useUser } from 'context/User';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import { Dispatch, useEffect, useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { getTheme } from 'theme';
import urls, { link, section } from 'URLS';
import { ColorMode, IEmployee, INotification } from 'utils/types';
const SIDEBAR_WIDTH = 190;
const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
  },
  gutterBottom: {
    marginBottom: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(1),
  },
  listRoot: {
    width: '100%',
  },
  link: {
    lineHeight: theme.spacing(0.2),
    color: theme.palette.text.disabled,
  },
  linkActive: {
    lineHeight: theme.spacing(0.2),
    color: theme.palette.primary.main,
  },
  pointerCursor: {
    cursor: 'pointer',
  },
  icon: {
    height: '8px',
    width: '8px',
    marginRight: theme.spacing(0.5),
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  removeScrollbar: {
    '&::-webkit-scrollbar': {
      background: 'transparent',
      width: '0px',
    },
  },
  showScrollBarOnHover: {
    overflow: 'hidden',
    '&:hover': {
      overflowY: 'auto',
    },
  },
  collapsNavbar: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
    cursor: 'pointer',
  },
  userCard: {
    backgroundColor: theme.palette.background.default,
  },
}));

/**
 * Collection of associated links
 * @param {section, boolean} params
 * @returns LinkGroup
 */
export const LinkGroup = ({ title, links, divider, setDrawer }: section & { setDrawer: (boolean) => void }) => {
  const router = useRouter();
  const classes = useStyles();
  return (
    <>
      <ListItemText color='disabled' primary={title} />
      <List component='div' disablePadding>
        {links.map((url: link) => {
          return (
            <Link href={url.link} key={url.title} passHref>
              <ListItem button className={classes.nested} component='a' onClick={() => setDrawer(false)}>
                <ListItemText
                  aria-label={url.aria_label}
                  classes={{ secondary: router.asPath === url.link ? classes.linkActive : classes.link }}
                  secondary={url.title}
                />
              </ListItem>
            </Link>
          );
        })}
        {divider ? <Divider /> : null}
      </List>
    </>
  );
};

/**
 * @typedef {object} NotificationsProps
 * @property {INotification} notification
 * @property {Dispatch<INotification[]>} setNotifications
 * @property {INotification[]} notifications
 */
export type NotificationProps = {
  notification: INotification;
  setNotifications: Dispatch<INotification[]>;
  notifications: INotification[];
};

/**
 * Display one notifications
 * @param {NotificationProps} params
 * @returns Notification
 */
export const Notification = ({ notification, setNotifications, notifications }: NotificationProps) => {
  const { mode } = useColorMode();
  const theme: Theme = getTheme(mode);
  useEffect(() => {
    if (!notification.read) {
      axios.put(`/api/notification/${notification.id}`);
    }
    return () => {
      const index = notifications.find((element: INotification) => notification.id === element.id).id;
      const newArray = [...notifications];
      newArray[index] = { ...notification, read: true };
      notification.read = true;
      setNotifications(newArray);
    };
  }, []);
  return (
    <>
      <Box p={theme.spacing(1)} style={{ backgroundColor: notification.read ? theme.palette.background.paper : theme.palette.primary.light }}>
        <Box alignItems='center' display='flex' flexDirection='row'>
          <Typo style={{ color: notification.read ? theme.palette.text.primary : theme.palette.primary.main }} variant='body2'>
            {notification.description}
          </Typo>
        </Box>
        <Box display='flex' justifyContent='flex-end'>
          <Typo variant='body2'>{moment(notification.createdAt).format('DD.MM.YYYY HH:mm')}</Typo>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

/**
 * @typedef {object} LoggedInUserCardProps
 * @property {IEmployee} user
 * @property {boolean} displayNotifications
 * @property {Dispatch<boolean>} setDisplayNotifications
 */
export type LoggedInUserCardProps = {
  user?: IEmployee;
  displayNotifications: boolean;
  setDisplayNotifications: Dispatch<boolean>;
};

/**
 * Displaying the current user
 * @param {LoggedInUserCardProps} params
 * @returns LoggedInUserCard
 */
export const LoggedInUserCard = ({ user, displayNotifications, setDisplayNotifications }: LoggedInUserCardProps) => {
  const classes = useStyles();
  const router = useRouter();
  const name = `${user?.firstName} ${user?.lastName[0]}.`;
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const { mode, toggleColorMode } = useColorMode();
  useEffect(() => {
    if (user) {
      axios.get(`/api/employee/${user.id}/notifications`).then((res) => {
        setNotifications([...res.data]);
      });
    }
  }, [user?.id, displayNotifications]);
  return (
    <Box boxShadow={'0px 4px 4px rgba(0,0,0,0.25)'} className={classnames(classes.gutterBottom, classes.userCard)} mx={'-16px'} padding={2}>
      <Box
        className={classes.pointerCursor}
        display='flex'
        onClick={() => setDisplayNotifications(!displayNotifications)}
        onKeyPress={() => setDisplayNotifications(!displayNotifications)}
        role='button'
        tabIndex={0}>
        <Box flex={3} mb={1}>
          <Badge badgeContent={notifications.filter((notification) => !notification.read).length} color='error'>
            {user ? (
              <Avatar firstName={user?.firstName} image={user?.imageUrl} lastName={user?.lastName} />
            ) : (
              <Skeleton height={40} variant='circular' width={40} />
            )}
          </Badge>
        </Box>
        <Box alignItems='center' display='flex' flex={4}>
          {user ? <Typo variant='body2'>{name}</Typo> : <Skeleton variant='text' width={100} />}
        </Box>
      </Box>
      {displayNotifications && (
        <>
          <Box alignItems='center' className={classes.gutterBottom} display='flex' flexDirection='column'>
            <Toggle defaultChecked={mode === ColorMode.LIGHT ? 0 : 1} onToggle={toggleColorMode} options={['Light ☀️', 'Dark 🌙']} />
            <Button
              onClick={() => {
                router.push('/innstillinger');
                setDisplayNotifications(false);
              }}>
              Innstillinger
            </Button>
            <Button onClick={() => signOut()}>Logg ut</Button>
          </Box>

          {notifications.length === 0 ? (
            <Typo variant='body2'>Ingen varsler</Typo>
          ) : (
            <>
              <Box maxHeight='60vh' mx={'-16px'} style={{ overflowX: 'hidden', overflowY: 'auto' }}>
                <ScrollableFeed className={classes.showScrollBarOnHover}>
                  {notifications.map((notification: INotification) => {
                    return <Notification key={notification.id} notification={notification} notifications={notifications} setNotifications={setNotifications} />;
                  })}
                </ScrollableFeed>
              </Box>
            </>
          )}

          <Box alignItems='flex-end' display='flex' flexDirection='column-reverse'>
            <IconButton aria-expanded={displayNotifications} aria-label='Lukk profil' onClick={() => setDisplayNotifications(false)}>
              <ExpandLessIcon />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};

/**
 * @typedef {object} DrawerType
 * @property {boolean} drawer
 * @property {function} setDrawer
 * @property {boolean} displayNotifications
 * @property {function} setDisplayNotifications
 * @property {string} variant
 * @property {IEmployee} user
 */
export type DrawerType = {
  drawer: boolean;
  setDrawer: (boolean) => void;
  displayNotifications: boolean;
  setDisplayNotifications: (boolean) => void;
  variant: 'permanent' | 'persistent' | 'temporary';
  user: IEmployee;
};

/**
 * Drawer based on Material UI´s drawer
 * @param {DrawerType} params
 * @returns Drawer
 */
export const Drawer = ({ drawer, setDrawer, displayNotifications, setDisplayNotifications, variant, user }: DrawerType) => {
  const classes = useStyles();
  //TODO:
  // Get automatically
  const { mode } = useColorMode();
  const theme: Theme = getTheme(mode);

  return (
    <MuiDrawer
      anchor='left'
      className={classes.drawer}
      classes={{ paper: classnames(classes.drawerPaper, classes.removeScrollbar) }}
      onClose={() => setDrawer(false)}
      open={drawer}
      variant={variant}>
      <Box className={classes.removeScrollbar} display='flex' flexDirection='column' padding={theme.spacing(2)}>
        <Box className={classes.gutterBottom}>
          <Image alt='TRAK sin logo' height={34} src={'/trak_logo.svg'} width={120} />
        </Box>
        <LoggedInUserCard displayNotifications={displayNotifications} setDisplayNotifications={setDisplayNotifications} user={user} />

        <Divider />
        {!displayNotifications && (
          <List className={classes.listRoot} component='nav'>
            {urls.map((url) => {
              return <LinkGroup divider={url.divider} key={url.title} links={url.links} setDrawer={setDrawer} title={url.title} />;
            })}
          </List>
        )}
      </Box>
    </MuiDrawer>
  );
};

/**
 * Sidebar of the page
 * @returns Sidebar
 */
const Sidebar = () => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState<boolean>(false);
  const [displayNotifications, setDisplayNotifications] = useState<boolean>(false);
  const { user } = useUser();

  return (
    <>
      <Hidden mdUp>
        <div className={classes.collapsNavbar} onClick={() => setDrawer(true)} onKeyPress={() => setDrawer(true)} role='button' tabIndex={-1}>
          <IconButton style={{ width: '50px', height: '50px' }}>
            <Menu />
          </IconButton>
        </div>
        <Drawer
          displayNotifications={displayNotifications}
          drawer={drawer}
          setDisplayNotifications={setDisplayNotifications}
          setDrawer={setDrawer}
          user={user}
          variant={'temporary'}
        />
      </Hidden>
      <Hidden mdDown>
        <Drawer
          displayNotifications={displayNotifications}
          drawer={true}
          setDisplayNotifications={setDisplayNotifications}
          setDrawer={() => undefined}
          user={user}
          variant={'permanent'}
        />
      </Hidden>
    </>
  );
};

export default Sidebar;
