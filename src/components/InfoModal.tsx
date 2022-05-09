import Edit from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import Comments from 'components/Comments';
import EmployeeSelector from 'components/form/EmployeeSelector';
import Markdown from 'components/Markdown';
import Modal from 'components/Modal';
import useSnackbar from 'context/Snackbar';
import { useUser } from 'context/User';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { IEmployeeTask } from 'utils/types';
import { fetcher } from 'utils/utils';
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
  const [hasSelectedNewResponsible, setHasSelectedNewResponsible] = useState<boolean>(false);
  const classes = useStyles();
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

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
        setLoading(true);
        await axios.put(`/api/employeeTasks/${employeeTask.id}`, {
          completed: employeeTask.completed,
          due_date: employeeTask.due_date,
          responsible_id: formData.responsible?.id,
        });
        const employeeWantsDelegateNotifications = formData.responsible.employee_settings?.delegate;
        const taskURL = `${process.env.NEXT_PUBLIC_TRAK_URL}/oppgave/${employeeTask.id}`;
        if (employeeWantsDelegateNotifications) {
          await axios.post('/api/notification', {
            description: `Oppgave delegert: "[${employeeTask.task.title}](${taskURL})"`,
            slack_description: `Oppgave "<${taskURL}|${employeeTask.task.title}>" er delegert til deg av ${user.first_name} ${user.last_name}`,
            employee_id: formData.responsible?.id,
            ...(formData.responsible.employee_settings?.slack && {
              email: formData.responsible.email,
            }),
            created_by: user,
          });
        }

        setLoading(false);
        setHasSelectedNewResponsible(false);
        employeeTask.responsible = formData.responsible;
        router
          .push({
            pathname: router.pathname,
            query: router.query,
          })
          .finally(() => {
            showSnackbar('Ansvarlig byttet', 'success');
          });
      } catch (error) {
        showSnackbar(error.response?.data?.message || 'Noe gikk galt', 'error');
      }
    }
  });

  return (
    <Typography variant='body1'>
      {employeeTask && !loading ? (
        hasSelectedNewResponsible ? (
          <form className={classes.centeringRow} noValidate>
            <EmployeeSelector control={control} label='Oppgaveansvarlig' name='responsible' required />
            <Button aria-label='Lagre' onClick={onSubmit} type='submit'>
              Lagre
            </Button>
            <Button aria-label='Avbryt' onClick={() => setHasSelectedNewResponsible(false)} type='button'>
              Avbryt
            </Button>
          </form>
        ) : (
          <Stack alignItems='flex-end' direction='row'>
            <Typography>{`${employeeTask?.responsible.first_name} ${employeeTask?.responsible.last_name}`}</Typography>
            <IconButton aria-label='Deleger oppgave' color='primary' onClick={() => setHasSelectedNewResponsible(true)} role='button' size='small'>
              <Edit />
            </IconButton>
          </Stack>
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

  const { data } = useSWR(`/api/employeeTasks/${employee_task_id}`, fetcher);

  return (
    <Modal
      buttonGroup={[
        <Button aria-label='Lukk modal' key={'avbryt'} onClick={closeModal} type='button'>
          Avbryt
        </Button>,
      ]}
      header={data ? <>{data?.task.title}</> : <Skeleton />}
      onClose={closeModal}
      onSubmit={null}
      open={modalIsOpen}
    >
      <>
        <div className={classes.grid}>
          <Typography variant='body1'>
            <b>Ansvarlig:</b>
          </Typography>
          <ResponsibleSelector employeeTask={data} />
          <Typography variant='body1'>
            <b>Gjelder:</b>
          </Typography>
          <Typography variant='body1'>
            {data ? `${data.employee.first_name} ${data?.employee.last_name}` : <Skeleton className={classes.skeleton} />}
          </Typography>
          <Typography variant='body1'>
            <b>Fase:</b>
          </Typography>
          <Typography variant='body1'>{data ? `${data.task.phase.title}` : <Skeleton className={classes.skeleton} />}</Typography>
          <Typography variant='body1'>
            <b>Forfallsdato:</b>
          </Typography>
          <Typography variant='body1'>{data ? format(new Date(data?.due_date), 'dd.MM.yyyy') : <Skeleton className={classes.skeleton} />}</Typography>
          {data?.completed_by && data?.completed_date && (
            <>
              <Typography variant='body1'>
                <b>Fullført av:</b>{' '}
              </Typography>
              <Typography variant='body1'>
                {data.completed_by.first_name} {data.employee_task?.completed_by.last_name} den {format(new Date(data.completed_date), 'dd.MM.yyyy')}
              </Typography>
            </>
          )}
        </div>
        <Markdown text={data?.task.description} />
        <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
          Kommentarer:
        </Typography>
        {data && <Comments employeeTask={data} />}
      </>
    </Modal>
  );
};

export default InfoModal;
