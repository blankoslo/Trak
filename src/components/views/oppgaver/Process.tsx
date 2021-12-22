import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TaskRow from 'components/views/oppgaver/TaskRow';
import { IEmployeeTask } from 'utils/types';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

type ProcessProps = {
  title: string;
  tasks: IEmployeeTask[];
};

const Process = ({ title, tasks }: ProcessProps) => {
  const classes = useStyles();
  return (
    <Stack className={classes.root} spacing={1}>
      <Typography variant='h3'>{`${title} (${tasks.length})`}</Typography>
      {tasks.length ? (
        <TableContainer>
          <Table aria-label='simple table' sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ padding: 0 }}>Oppgavetittel</TableCell>
                <TableCell sx={{ padding: 0 }}>Gjelder</TableCell>
                <TableCell sx={{ padding: 0 }}>Forfallsdato</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TaskRow data={task} key={task.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant='body1'>Du har ingen oppgaver i denne prosessen</Typography>
      )}
    </Stack>
  );
};

export default Process;
