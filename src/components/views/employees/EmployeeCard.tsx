import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';

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
};

const EmployeeCard = ({ id, firstName, lastName, imageUrl, role }: EmployeeCardProps) => {
  const classes = useStyles();
  return (
    <Link href={`/ansatt/${id}`} passHref>
      <ButtonBase className={classes.root}>
        <Avatar alt={`${firstName[0]}.${lastName[0]}`} src={imageUrl} sx={{ width: 80, height: 80 }} />
        <Stack spacing={1} sx={{ justifyContent: 'center' }}>
          <Typography variant='h4'>
            {firstName} {lastName[0]}.
          </Typography>
          <Typography variant='h5'>{role || 'Ukjent'}</Typography>
        </Stack>
      </ButtonBase>
    </Link>
  );
};

export default EmployeeCard;
