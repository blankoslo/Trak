import { IconButton, makeStyles } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank, Info } from '@material-ui/icons';
import Avatar from 'components/Avatar';
import InfoModal from 'components/InfoModal';
import Typo from 'components/Typo';
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

  return (
    <>
      <div className={classes.centeringRow}>
        <IconButton onClick={() => undefined} size='small'>
          {data.completed ? <CheckBox /> : <CheckBoxOutlineBlank />}
        </IconButton>
        <Typo className={data.completed && classes.completedTask}>{data.task.title}</Typo>
        <IconButton onClick={() => setModalIsOpen(true)} size='small'>
          <Info color={data.completed ? 'inherit' : 'primary'} />
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
