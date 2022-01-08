import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { isToday } from 'utils/utils';
type NotificationCardProps = {
  time: Date;
  description: string;
  read: boolean;
};

const NotificationCard = ({ time, description, read }: NotificationCardProps) => {
  const createdToday = isToday(new Date(time));
  return (
    <Stack p={1} sx={{ backgroundColor: read ? 'background.default' : 'background.paper' }}>
      <Typography sx={{ textAlign: 'right' }} variant='body2'>
        {createdToday ? format(new Date(time), 'HH:mm') : format(new Date(time), 'dd/MM')}
      </Typography>
      <Typography flexWrap={'wrap'} sx={{ maxWidth: '80%' }} variant='body2'>
        {description}
      </Typography>
    </Stack>
  );
};

export default NotificationCard;
