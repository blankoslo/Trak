import { Edit } from '@mui/icons-material/';
import { IconButton, TableCell, TableRow, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Avatar from 'components/Avatar';
import TaskModal from 'components/views/prosessmal/TaskModal';
import markdownToTxt from 'markdown-to-txt';
import { useState } from 'react';
import { IPhase, ITask } from 'utils/types';
export type TaskProps = {
  task: ITask;
  phase: IPhase;
};

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650,
  },
  hideLastBorder: {
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
  headerCell: {
    color: theme.palette.text.disabled,
    paddingBottom: 0,
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarSize: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
}));
const TaskRow = ({ task, phase }: TaskProps) => {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  if (!task) {
    return <></>;
  }
  return (
    <TableRow className={classes.hideLastBorder} key={task.id}>
      <TableCell style={{ width: '25rem' }}>{task.title}</TableCell>
      <TableCell style={{ width: '55rem' }} sx={{ display: { md: 'table-cell', xs: 'none' } }}>
        {markdownToTxt(task.description)}
      </TableCell>
      <TableCell style={{ width: '55rem' }} sx={{ display: { lg: 'table-cell', xs: 'none' } }}>
        {task.professions.length === 3 ? 'Alle' : task.professions[0]?.title}
      </TableCell>
      <TableCell style={{ width: '20rem' }} sx={{ display: { sm: 'table-cell', xs: 'none' } }}>
        {task.responsible && (
          <div className={classes.flexCenter}>
            <Avatar
              className={classes.avatarSize}
              firstName={task.responsible.firstName}
              image={task.responsible.imageUrl}
              lastName={task.responsible.lastName}
            />
            {`${task.responsible.firstName} ${task.responsible.lastName}`}
          </div>
        )}
      </TableCell>
      <TableCell style={{ width: '10rem' }}>
        <IconButton
          aria-label={`Endre oppgaven ${task.title}`}
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          <Edit color='primary' />
        </IconButton>
        {modalIsOpen && <TaskModal closeModal={() => setModalIsOpen(false)} modalIsOpen={modalIsOpen} phase={phase} task_id={task.id} />}
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;
