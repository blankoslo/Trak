import AlarmIcon from '@mui/icons-material/Alarm';
import { Box, Button, Divider, Hidden, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddButton from 'components/AddButton';
import Typo from 'components/Typo';
import ChangeDueDateModal from 'components/views/ansatt/ChangeDueDateModal';
import TaskModal from 'components/views/ansatt/TaskModal';
import TaskRow from 'components/views/ansatt/TaskRow';
import moment from 'moment';
import { useState } from 'react';
import { IEmployeeTask } from 'utils/types';

const useStyles = makeStyles((theme: Theme) => ({
  spaceRight: {
    marginRight: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  lessMarginBottom: {
    marginBottom: theme.spacing(1),
  },
}));

/**
 * @typedef {object} PhaseProps
 * @property {string} phaseId
 * @property {string} title
 * @property {number} tasksFinished
 * @property {number} totalTasks
 * @property {IEmployeeTask[]} employeeTasks
 * @property {boolean} first
 */
export type PhaseProps = {
  phaseId: string;
  title: string;
  tasksFinished: number;
  totalTasks: number;
  employeeTasks: IEmployeeTask[];
  first: boolean;
};

/**
 * Card to display the different employeeTasks in a specific phase
 * @param {PhaseProps} params
 * @returns Phase
 */
const Phase = ({ phaseId, title, tasksFinished, totalTasks, employeeTasks, first }: PhaseProps) => {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [createTaskModalIsOpen, setCreateModalIsOpen] = useState(false);
  const globalTasks = employeeTasks.filter((task) => task.task.global);
  const nonGlobalTasks = employeeTasks.filter((task) => !task.task.global);
  return (
    <Box classes={classes.marginBottom}>
      <Box alignItems='center' display='flex'>
        <Typo className={classes.spaceRight} variant='h2'>
          {title}
        </Typo>
        <Button onClick={() => setModalIsOpen(true)} size='medium' startIcon={<AlarmIcon />}>
          {moment(employeeTasks[0].dueDate).format('DD.MM.YYYY')}
        </Button>
      </Box>
      <Box display='flex'>
        <Box className={classes.lessMarginBottom} flex={2}>
          <Typo variant='body2'>
            <b>{tasksFinished}</b> av <b>{totalTasks}</b> oppgaver er gjennomført
          </Typo>
        </Box>
        <Hidden smDown>
          <Box flex={1}>{first && <Typo variant='body2'>Ansvarlig</Typo>}</Box>
        </Hidden>
      </Box>
      {globalTasks.map((employeeTask) => {
        return <TaskRow employeeTask={employeeTask} key={employeeTask.taskId} />;
      })}
      {nonGlobalTasks.length ? (
        <>
          <Typo style={{ marginTop: '8px' }} variant='body2'>
            Egendefinerte oppgaver
          </Typo>
          <Divider style={{ marginBottom: '8px' }} />
          {nonGlobalTasks.map((employeeTask) => {
            return <TaskRow employeeTask={employeeTask} key={employeeTask.taskId} />;
          })}
        </>
      ) : undefined}
      <AddButton onClick={() => setCreateModalIsOpen(true)} text='Legg til oppgave' />
      <ChangeDueDateModal closeModal={() => setModalIsOpen(false)} employeeTasks={employeeTasks} modalIsOpen={modalIsOpen} />
      <TaskModal closeModal={() => setCreateModalIsOpen(false)} dueDate={employeeTasks[0]?.dueDate} modalIsOpen={createTaskModalIsOpen} phaseId={phaseId} />
    </Box>
  );
};

export default Phase;
