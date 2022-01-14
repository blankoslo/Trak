import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from 'components/Avatar';
import format from 'date-fns/format';
import Image from 'next/image';
import { IEmployee } from 'utils/types';
import { isToday } from 'utils/utils';
type NotificationCardProps = {
  time: Date;
  description: string;
  read: boolean;
  createdBy?: IEmployee;
};

const NotificationCard = ({ time, description, createdBy, read }: NotificationCardProps) => {
  const createdToday = isToday(new Date(time));
  return (
    <Grid container padding={1} spacing={1} sx={{ backgroundColor: read ? 'background.default' : 'background.paper' }}>
      <Grid item xs={2}>
        {createdBy ? (
          <Avatar firstName={createdBy.firstName} image={createdBy.imageUrl} lastName={createdBy.lastName} />
        ) : (
          <Image alt='T' height={62} src={createdBy?.imageUrl || '/trakLogo.png'} width={32} />
        )}
      </Grid>
      <Grid item xs={10}>
        <Stack direction='column'>
          <Box display='flex' justifyContent={'space-between'}>
            <Typography color={'primary.main'} variant='body2'>
              {createdBy ? createdBy.firstName : 'TRAK'}
            </Typography>
            <Typography color={'primary.main'} variant='body2'>
              {createdToday ? format(new Date(time), 'HH:mm') : format(new Date(time), 'dd/MM')}
            </Typography>
          </Box>
          <Typography sx={{ maxWidth: '80%' }} variant='body2'>
            {description}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default NotificationCard;
