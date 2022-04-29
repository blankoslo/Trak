import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import TaskRow from 'components/views/oppgaver/TaskRow';
import { useState } from 'react';
import { IEmployeeTask } from 'utils/types';
const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

type ProcessProps = {
  title: string;
  tasks: IEmployeeTask[];
  displayResponsible: boolean;
};

const Process = ({ title, tasks, displayResponsible }: ProcessProps) => {
  const classes = useStyles();
  const [showProcess, setShowProcess] = useState(true);
  return (
    <Stack className={classes.root} spacing={1}>
      <Stack direction={'row'}>
        <Typography variant='h3'>{`${title} (${tasks.length})`}</Typography>
        <IconButton onClick={() => setShowProcess(!showProcess)} sx={{ padding: 0, color: 'primary.main' }}>
          {showProcess ? <ArrowDropUpIcon fontSize='large' /> : <ArrowDropDownIcon fontSize='large' />}
        </IconButton>
      </Stack>
      {showProcess &&
        (tasks.length ? (
          <TableContainer>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: 0 }}>Oppgavetittel</TableCell>
                  <TableCell sx={{ padding: 0 }}>Gjelder</TableCell>
                  {displayResponsible && <TableCell sx={{ display: { md: 'table-cell', xs: 'none' }, padding: 0 }}>Ansvarlig</TableCell>}
                  <TableCell sx={{ display: { md: 'table-cell', xs: 'none' }, padding: 0 }}>Forfaller</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TaskRow data={task} displayResponsible={displayResponsible} key={task.id} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant='body1'>Du har ingen oppgaver i denne prosessen</Typography>
        ))}
    </Stack>
  );
};

export default Process;
