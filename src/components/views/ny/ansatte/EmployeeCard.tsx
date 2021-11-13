import { Avatar, Stack, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Typo from 'components/Typo';

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
  firstName: string;
  lastName: string;
  imageUrl: string;
  role: string;
};

const EmployeeCard = ({ firstName, lastName, imageUrl, role }: EmployeeCardProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar alt={`${firstName[0]}.${lastName[0]}`} src={imageUrl} sx={{ width: 80, height: 80 }} />
      <Stack spacing={1} sx={{ justifyContent: 'center' }}>
        <Typo variant='h4'>
          {firstName} {lastName[0]}.
        </Typo>
        <Typo variant='h5'>{role || 'Ukjent'}</Typo>
      </Stack>
    </div>
  );
};

export default EmployeeCard;
