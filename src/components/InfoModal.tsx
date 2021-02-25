import { Box, Button, Chip, makeStyles } from '@material-ui/core';
import axios from 'axios';
import Modal from 'components/Modal';
import Typo from 'components/Typo';
import { useEffect, useState } from 'react';
import theme from 'theme';
import { IEmployeeTask } from 'utils/types';

const useStyles = makeStyles({
  chip: {
    marginRight: theme.spacing(1),
  },
  gutterBottom: {
    marginBottom: theme.spacing(2),
  },
});

type InfoModalProps = {
  employee_task_id: string;
  modalIsOpen: boolean;
  closeModal: () => void;
};

const InfoModal = ({ employee_task_id, modalIsOpen, closeModal }: InfoModalProps) => {
  const classes = useStyles();
  const [employeeTask, setEmployeeTask] = useState<IEmployeeTask | undefined>(undefined);

  useEffect(() => {
    axios.get(`/api/employeeTasks/${employee_task_id}`).then((res) => {
      setEmployeeTask(res.data);
    });
  }, [employee_task_id]);

  return (
    <Modal
      buttonGroup={[
        <div key={'whitespace'}></div>,
        <Button key={'avbryt'} onClick={closeModal} type='button'>
          Avbryt
        </Button>,
      ]}
      header={employeeTask?.task.title}
      onClose={closeModal}
      onSubmit={null}
      open={modalIsOpen}>
      {employeeTask ? (
        <>
          <Typo variant='body1'>
            <b>Ansvarlig:</b> {employeeTask?.responsible && `${employeeTask?.responsible.firstName} ${employeeTask?.responsible.lastName}`}
          </Typo>
          <Typo variant='body1'>
            <b>Gjelder:</b> {employeeTask?.employee.firstName} {employeeTask?.employee.lastName}
          </Typo>
          <Typo className={classes.gutterBottom} variant='body1'>
            <b>Fase:</b> {employeeTask?.task.phase.title}
          </Typo>
          <Box className={classes.gutterBottom}>
            {employeeTask?.task.tags.map((tag) => {
              return <Chip className={classes.chip} color='primary' key={tag.id} label={tag.title} size='small' />;
            })}
          </Box>
          <Typo variant='body2'>{employeeTask?.task.description}</Typo>
        </>
      ) : (
        <div>Laster...</div>
      )}
    </Modal>
  );
};

export default InfoModal;
