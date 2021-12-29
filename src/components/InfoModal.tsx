import Edit from '@mui/icons-material/Edit';
import { Box, Button, Chip, IconButton, Skeleton, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import EmployeeSelector from 'components/form/EmployeeSelector';
import Modal from 'components/Modal';
import { DataProvider, useData } from 'context/Data';
import useSnackbar from 'context/Snackbar';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Linkify from 'react-linkify';
import ReactMarkdown from 'react-markdown';
import { IEmployeeTask } from 'utils/types';

const useStyles = makeStyles((theme: Theme) => ({
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
    display: 'grid',
    gridTemplateColumns: '4fr 1fr 1fr',
  },
  skeleton: {
    width: theme.spacing(32),
  },
  skeletonHeight: {
    height: theme.spacing(24),
  },
}));
export const ResponsibleSelector = ({ employeeTask }: { employeeTask: IEmployeeTask }) => {
  const [responsibleSelector, setResponsibleSelector] = useState<boolean>(false);
  const { employees } = useData();
  const classes = useStyles();
  const showSnackbar = useSnackbar();
  const router = useRouter();

  const { control, reset, handleSubmit } = useForm({
    reValidateMode: 'onChange',
    defaultValues: useMemo(
      () => ({
        responsible: employeeTask?.responsible,
      }),
      [employeeTask, employeeTask?.responsible],
    ),
  });

  useEffect(() => {
    reset({
      responsible: employeeTask?.responsible,
    });
  }, [employeeTask, employeeTask?.responsible]);

  useMemo(() => employeeTask, [employeeTask, employeeTask?.responsible]);

  const onSubmit = handleSubmit(async (formData) => {
    if (formData.responsible?.id !== employeeTask.responsible.id) {
      try {
        await axios.put(`/api/employeeTasks/${employeeTask.id}`, {
          completed: employeeTask.completed,
          dueDate: employeeTask.dueDate,
          responsibleId: formData.responsible?.id,
        });
        const employeeWantsDelegateNotifications = formData.responsible.employeeSettings?.notificationSettings?.includes('DELEGATE');
        if (employeeWantsDelegateNotifications) {
          await axios.post('/api/notification', {
            description: `Du har blitt delegert arbeidsoppgaven "${employeeTask.task.title}" av ${employeeTask.responsible.firstName} ${employeeTask.responsible.lastName}`,
            employeeId: formData.responsible?.id,
            ...(formData.responsible.employeeSettings?.slack && {
              email: formData.responsible.email,
            }),
          });
        }

        setResponsibleSelector(false);
        employeeTask.responsible = formData.responsible;
        router.replace(router.asPath).finally(() => {
          showSnackbar('Ansvarlig byttet', 'success');
        });
      } catch (error) {
        showSnackbar(error.response?.data?.message || 'Noe gikk galt', 'error');
      }
    }
  });

  return (
    <Typography variant='body1'>
      {employeeTask ? (
        responsibleSelector ? (
          <form className={classes.centeringRow} noValidate>
            <EmployeeSelector control={control} employees={employees} label='Oppgaveansvarlig' name='responsible' required />
            <Button aria-label='Lagre' onClick={onSubmit} type='submit'>
              Lagre
            </Button>
            <Button aria-label='Avbryt' onClick={() => setResponsibleSelector(false)} type='button'>
              Avbryt
            </Button>
          </form>
        ) : (
          <>
            {`${employeeTask?.responsible.firstName} ${employeeTask?.responsible.lastName}`}
            <IconButton aria-label='Deleger oppgave' onClick={() => setResponsibleSelector(true)} role='button' size='small'>
              <Edit />
            </IconButton>
          </>
        )
      ) : (
        <Skeleton className={classes.skeleton} />
      )}
    </Typography>
  );
};

export type InfoModalProps = {
  employee_task_id: string;
  modalIsOpen: boolean;
  closeModal: () => void;
};
const InfoModal = ({ employee_task_id, modalIsOpen, closeModal }: InfoModalProps) => {
  const classes = useStyles();
  const [employeeTask, setEmployeeTask] = useState<IEmployeeTask | undefined>(undefined);
  const showSnackbar = useSnackbar();

  useEffect(() => {
    axios
      .get(`/api/employeeTasks/${employee_task_id}`)
      .then((res) => {
        setEmployeeTask(res.data);
      })
      .catch((error) => {
        showSnackbar(error.response.data?.message || 'Noe gikk galt', 'error');
      });
  }, [employee_task_id]);
  return (
    <Modal
      buttonGroup={[
        <Button aria-label='Lukk modal' key={'avbryt'} onClick={closeModal} type='button'>
          Avbryt
        </Button>,
      ]}
      header={employeeTask ? <>{employeeTask?.task.title}</> : <Skeleton />}
      onClose={closeModal}
      onSubmit={null}
      open={modalIsOpen}
    >
      <>
        <div className={classes.grid}>
          <Typography variant='body1'>
            <b>Ansvarlig:</b>
          </Typography>
          <DataProvider>
            <ResponsibleSelector employeeTask={employeeTask} />
          </DataProvider>
          <Typography variant='body1'>
            <b>Gjelder:</b>
          </Typography>
          <Typography variant='body1'>
            {employeeTask ? `${employeeTask?.employee.firstName} ${employeeTask?.employee.lastName}` : <Skeleton className={classes.skeleton} />}
          </Typography>
          <Typography variant='body1'>
            <b>Fase:</b>
          </Typography>
          <Typography variant='body1'>{employeeTask ? `${employeeTask?.task.phase.title}` : <Skeleton className={classes.skeleton} />}</Typography>
          <Typography variant='body1'>
            <b>Forfallsdato:</b>
          </Typography>
          <Typography variant='body1'>
            {employeeTask ? format(new Date(employeeTask?.dueDate), 'dd.MM.yyyy') : <Skeleton className={classes.skeleton} />}
          </Typography>
          {employeeTask?.completedBy && employeeTask?.completedDate && (
            <>
              <Typography variant='body1'>
                <b>Fullført av:</b>{' '}
              </Typography>
              <Typography variant='body1'>
                {employeeTask.completedBy.firstName} {employeeTask.completedBy.lastName} den {format(new Date(employeeTask?.completedDate), 'dd.MM.yyyy')}
              </Typography>
            </>
          )}
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
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i}>
                    <Chip />
                  </Skeleton>
                ))}
            </div>
          )}
        </Box>
        <Typography>
          {employeeTask ? (
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a href={decoratedHref} key={key} target='blank'>
                  {decoratedText}
                </a>
              )}
            >
              <ReactMarkdown>{employeeTask?.task.description}</ReactMarkdown>
            </Linkify>
          ) : (
            <Skeleton className={classes.skeletonHeight} />
          )}
        </Typography>
      </>
    </Modal>
  );
};

export default InfoModal;
