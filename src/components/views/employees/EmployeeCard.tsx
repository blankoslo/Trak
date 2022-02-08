import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import { getEmoji } from 'utils/utils';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    width: '100%',
  },
}));

export type EmployeeCardProps = {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  role: string;
  gender: string;
};

const EmployeeCard = ({ id, firstName, lastName, imageUrl, role, gender }: EmployeeCardProps) => {
  const classes = useStyles();
  const emoji = getEmoji(role, gender);

  return (
    <Link href={`/ansatt/${id}`} passHref>
      <ButtonBase className={classes.root}>
        <Avatar alt={`${firstName[0]}.${lastName[0]}`} src={imageUrl} sx={{ width: 80, height: 80 }} />
        <Stack spacing={1} sx={{ justifyContent: 'center' }}>
          <Typography variant='h4'>
            {firstName} {lastName[0]}.
          </Typography>
          <Typography variant='h5'>
            {emoji}

            {role || 'Ukjent'}
          </Typography>
        </Stack>
      </ButtonBase>
    </Link>
  );
};

export default EmployeeCard;
