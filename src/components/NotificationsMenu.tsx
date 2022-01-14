import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import NotificationCard from 'components/NotificationCard';
import useSWR, { mutate } from 'swr';
import { IEmployee } from 'utils/types';
import { fetcher } from 'utils/utils';

const useStyles = makeStyles((theme: Theme) => ({
  removeScrollbar: {
    '&::-webkit-scrollbar': {
      background: 'transparent',
      width: '2px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main,
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.background.default,
    },
  },
}));

type NotificationsMenuProps = {
  user: IEmployee;
} & MenuProps;

const NotificationsMenu = ({ user, ...args }: NotificationsMenuProps) => {
  const { data } = useSWR(`/api/employees/${user.id}/notifications`, fetcher);
  const classes = useStyles();

  const markAsRead = () => {
    data.forEach((element) => {
      axios.put(`/api/notification/${element.id}`);
    });
    const updatedNotifications = data.map((element) => ({ ...element, read: true }));
    mutate(`/api/employees/${user.id}/notifications`, updatedNotifications, false);
    mutate('/api/meta/notification', 0, false);
  };
  return (
    <Menu
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      {...args}
      PaperProps={{ className: classes.removeScrollbar }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      id='basic-menu'
      sx={[{ minWidth: '250px', maxWidth: '320px', maxHeight: '500px' }]}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {!data ? (
        <MenuItem>
          <CircularProgress />
        </MenuItem>
      ) : (
        <>
          {data.length === 0 ? (
            <MenuItem>
              <Typography variant='body2'>Du har ingen varsler</Typography>
            </MenuItem>
          ) : (
            <>
              <MenuItem>
                <Box display='flex' justifyContent='space-between' p={1} width='100%'>
                  <Typography variant='body1'>Varsler</Typography>
                  <Button onClick={markAsRead} size='small' sx={{ padding: 0 }}>
                    Mark alle som lest
                  </Button>
                </Box>
              </MenuItem>
              {data.map((notification) => (
                <>
                  <NotificationCard
                    createdBy={notification.createdByEmployee}
                    description={notification.description}
                    key={notification.id}
                    read={notification.read}
                    time={notification.createdAt}
                  />
                  <Divider />
                </>
              ))}
            </>
          )}
        </>
      )}
    </Menu>
  );
};

export default NotificationsMenu;
