import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { getEmoji } from 'utils/utils';

export type EmployeeCardProps = {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  role: string;
  gender: string;
  nrOfMyTasks: number;
  processTemplate: string;
};

const EmployeeCard = ({ id, firstName, lastName, imageUrl, role, gender, nrOfMyTasks, processTemplate }: EmployeeCardProps) => {
  const emoji = getEmoji(role, gender);

  return (
    <Link href={`/ansatt/${id}?process=${processTemplate}`} passHref>
      <ButtonBase
        sx={{
          borderRadius: 2,
          backgroundColor: 'background.paper',
          padding: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          width: '100%',
          alignItems: 'start',
        }}
      >
        <Avatar alt={`${firstName[0]}.${lastName[0]}`} src={imageUrl} sx={{ width: 80, height: 80 }} />
        <Stack padding={1} spacing={0}>
          <Typography variant='h4'>
            {firstName} {lastName[0]}.
          </Typography>
          <Typography variant='caption'>
            {emoji}

            {role || 'Ukjent'}
          </Typography>
          {Boolean(nrOfMyTasks) && <Typography variant='caption'>{`${nrOfMyTasks} oppgave${nrOfMyTasks > 1 ? 'r' : ''} gjenstår`}</Typography>}
        </Stack>
      </ButtonBase>
    </Link>
  );
};

export default EmployeeCard;
