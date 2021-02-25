import { Box, Button, Chip, makeStyles, Skeleton } from '@material-ui/core';
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'fit-content(100%) auto',
    columnGap: theme.spacing(2),
  },
  centeringRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.spacing(2),
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
      header={employeeTask ? <>{employeeTask?.task.title}</> : <Skeleton />}
      onClose={closeModal}
      onSubmit={null}
      open={modalIsOpen}>
      <>
        <div className={classes.grid}>
          <Typo variant='body1'>
            <b>Ansvarlig:</b>
          </Typo>
          <Typo variant='body1'>
            {employeeTask ? `${employeeTask?.responsible.firstName} ${employeeTask?.responsible.lastName}` : <Skeleton width={theme.spacing(32)} />}
          </Typo>
          <Typo variant='body1'>
            <b>Gjelder:</b>
          </Typo>
          <Typo variant='body1'>
            {employeeTask ? `${employeeTask?.employee.firstName} ${employeeTask?.employee.lastName}` : <Skeleton width={theme.spacing(32)} />}
          </Typo>
          <Typo variant='body1'>
            <b>Fase:</b>
          </Typo>
          <Typo variant='body1'>{employeeTask ? `${employeeTask?.task.phase.title}` : <Skeleton width={theme.spacing(32)} />}</Typo>
        </div>
        <Box className={classes.gutterBottom}>
          {employeeTask ? (
            <>
              {employeeTask?.task.tags.map((tag) => {
                return <Chip className={classes.chip} color='primary' key={tag.id} label={tag.title} size='small' />;
              })}
            </>
          ) : (
            <div className={classes.centeringRow}>
              {Array(5).map((_, i) => (
                <Skeleton key={i}>
                  <Chip />
                </Skeleton>
              ))}
            </div>
          )}
        </Box>
        <Typo variant='body2'>{employeeTask ? <>{employeeTask?.task.description}</> : <Skeleton height={theme.spacing(24)} />}</Typo>
      </>
    </Modal>
  );
};

export default InfoModal;
