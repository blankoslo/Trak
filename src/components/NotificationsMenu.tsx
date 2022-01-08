import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import NotificationCard from 'components/NotificationCard';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import { IEmployee } from 'utils/types';
import { fetcher } from 'utils/utils';

type NotificationsMenuProps = {
  user: IEmployee;
} & MenuProps;

const NotificationsMenu = ({ user, ...args }: NotificationsMenuProps) => {
  const { data } = useSWR(`/api/employees/${user.id}/notifications`, fetcher);
  const router = useRouter();
  const [allTasksMarked, setAllTasksMarked] = useState(false);

  const markAsRead = () => {
    data.forEach(async (element) => {
      await axios.put(`/api/notification/${element.id}`);
    });
    router.push({
      pathname: router.asPath,
    });
    setAllTasksMarked(true);
  };
  return (
    <Menu
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      {...args}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      id='basic-menu'
      sx={{ minWidth: '250px', maxWidth: '300px' }}
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
          {data.length === 0 || allTasksMarked ? (
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
                  <NotificationCard description={notification.description} key={notification.id} read={notification.read} time={notification.createdAt} />
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
