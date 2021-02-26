import { IconButton, makeStyles } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank, Info } from '@material-ui/icons';
import axios from 'axios';
import Avatar from 'components/Avatar';
import InfoModal from 'components/InfoModal';
import Typo from 'components/Typo';
import useSnackbar from 'context/Snackbar';
import { useState } from 'react';
import theme from 'theme';
import { IEmployeeTask } from 'utils/types';

const useStyles = makeStyles({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  completedTask: {
    textDecoration: 'line-through',
  },
  centeringRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const TaskRow = ({ data }: { data: IEmployeeTask }) => {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(data.completed);
  const showSnackbar = useSnackbar();

  const toggelCheckBox = () => {
    axios
      .put(`/api/employeeTasks/${data.id}`, {
        completed: !completed,
        dueDate: data.dueDate,
        responsibleId: data.responsibleId,
      })
      .then(() => {
        showSnackbar('Oppgave fullført', 'success');
        setCompleted(!completed);
      })
      .catch((error) => {
        showSnackbar(error.response.data?.message, 'error');
      });
  };

  return (
    <>
      <div className={classes.centeringRow}>
        <IconButton onClick={toggelCheckBox} size='small'>
          {completed ? <CheckBox /> : <CheckBoxOutlineBlank />}
        </IconButton>
        <Typo className={completed ? classes.completedTask : undefined}>{data.task.title}</Typo>
        <IconButton onClick={() => setModalIsOpen(true)} size='small'>
          <Info color={completed ? 'inherit' : 'primary'} />
        </IconButton>
        {modalIsOpen && <InfoModal closeModal={() => setModalIsOpen(false)} employee_task_id={data.id} modalIsOpen={modalIsOpen} />}
      </div>
      <div>{data.task.phase.processTemplate.title}</div>
      <div className={classes.centeringRow}>
        <Avatar className={classes.avatar} firstName={data.employee.firstName} image={data.employee.imageUrl} lastName={data.employee.lastName} />
        <Typo>{`${data.employee.firstName} ${data.employee.lastName}`}</Typo>
      </div>
    </>
  );
};

export default TaskRow;
