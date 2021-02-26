import { Box, IconButton } from '@material-ui/core';
import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, Info as InfoIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import Avatar from 'components/Avatar';
import InfoModal from 'components/InfoModal';
import Typo from 'components/Typo';
import { EmployeeContext } from 'pages/ansatt/[id]';
import { useContext, useState } from 'react';
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
});

type TaskRowProps = {
  employeeTask: IEmployeeTask;
};

const TaskRow = ({ employeeTask }: TaskRowProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const classes = useStyles();
  const { employee } = useContext(EmployeeContext);

  return (
    <Box display='flex'>
      <Box alignItems='center' display='flex' flex={2}>
        {employeeTask.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        <Typo className={employeeTask.completed && classes.completedTask} color={!employeeTask.completed && 'disabled'} noWrap variant='body1'>
          {employeeTask.task.title}
        </Typo>
        <IconButton onClick={() => setModalIsOpen(true)} size='small'>
          <InfoIcon color={employeeTask.completed ? 'inherit' : 'primary'} />
        </IconButton>
        {modalIsOpen && <InfoModal closeModal={() => setModalIsOpen(false)} employee_task_id={employeeTask.id} modalIsOpen={modalIsOpen} />}
      </Box>
      {employeeTask.responsible.id !== employee.hrManager.id && (
        <Box alignItems='center' display='flex' flex={1} flexDirection='row'>
          <Avatar
            className={classes.avatar}
            firstName={employeeTask.responsible.firstName}
            image={employeeTask.responsible.imageUrl}
            lastName={employeeTask.responsible.lastName}
          />
          <Typo variant='body1'>
            {employeeTask.responsible.firstName} {employeeTask.responsible.lastName}
          </Typo>
        </Box>
      )}
    </Box>
  );
};
export default TaskRow;
