import { Box, Button } from '@material-ui/core';
import AlarmIcon from '@material-ui/icons/Alarm';
import { makeStyles } from '@material-ui/styles';
import AddButton from 'components/AddButton';
import Typo from 'components/Typo';
import TaskRow from 'components/views/ansatt/TaskRow';
import moment from 'moment';
import theme from 'theme';
import { IEmployeeTask } from 'utils/types';

const useStyles = makeStyles({
  spaceRight: {
    marginRight: theme.spacing(2),
  },
});

type PhaseProps = {
  title: string;
  tasksFinished: number;
  totalTasks: number;
  employeeTasks: IEmployeeTask[];
};

const Phase = ({ title, tasksFinished, totalTasks, employeeTasks }: PhaseProps) => {
  const classes = useStyles();
  return (
    <Box marginBottom={theme.spacing(2)}>
      <Box alignItems='center' display='flex'>
        <Typo className={classes.spaceRight} variant='h2'>
          {title}
        </Typo>
        <Button size='medium' startIcon={<AlarmIcon />}>
          {moment(employeeTasks[0].dueDate).format('DD.MM.YYYY')}
        </Button>
      </Box>
      <Box display='flex'>
        <Box flex={2} mb={theme.spacing(1)}>
          <Typo variant='body2'>
            <b>{tasksFinished}</b> av <b>{totalTasks}</b> oppgaver er gjennomført
          </Typo>
        </Box>
        <Box flex={1}>
          <Typo variant='body2'>Ansvarlig</Typo>
        </Box>
      </Box>
      {employeeTasks.map((employeeTask) => {
        return <TaskRow employeeTask={employeeTask} key={employeeTask.taskId} />;
      })}
      <AddButton onClick={() => undefined} text='Legg til oppgave' />
    </Box>
  );
};

export default Phase;
