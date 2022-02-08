import Edit from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import ChipSkeleton from 'components/ChipSkeleton';
import Comments from 'components/Comments';
import EmployeeSelector from 'components/form/EmployeeSelector';
import Modal from 'components/Modal';
import TextMarkDownWithLink from 'components/TextMarkDownWithLink';
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
          dueDate: employeeTask.dueDate,
          responsibleId: formData.responsible?.id,
        });
        const employeeWantsDelegateNotifications = formData.responsible.employeeSettings?.notificationSettings?.includes('DELEGATE');
        if (employeeWantsDelegateNotifications) {
          await axios.post('/api/notification', {
            description: `Oppgave delegert: "${employeeTask.task.title}"`,
            employeeId: formData.responsible?.id,
            ...(formData.responsible.employeeSettings?.slack && {
              email: formData.responsible.email,
            }),
            createdBy: user,
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
          <>
            {`${employeeTask?.responsible.firstName} ${employeeTask?.responsible.lastName}`}
            <IconButton aria-label='Deleger oppgave' color='primary' onClick={() => setHasSelectedNewResponsible(true)} role='button' size='small'>
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
          <Typography variant='body1'>{data ? `${data.employee.firstName} ${data?.employee.lastName}` : <Skeleton className={classes.skeleton} />}</Typography>
          <Typography variant='body1'>
            <b>Fase:</b>
          </Typography>
          <Typography variant='body1'>{data ? `${data.task.phase.title}` : <Skeleton className={classes.skeleton} />}</Typography>
          <Typography variant='body1'>
            <b>Forfallsdato:</b>
          </Typography>
          <Typography variant='body1'>{data ? format(new Date(data?.dueDate), 'dd.MM.yyyy') : <Skeleton className={classes.skeleton} />}</Typography>
          {data?.completedBy && data?.completedDate && (
            <>
              <Typography variant='body1'>
                <b>Fullført av:</b>{' '}
              </Typography>
              <Typography variant='body1'>
                {data.completedBy.firstName} {data.employeeTask?.completedBy.lastName} den {format(new Date(data.completedDate), 'dd.MM.yyyy')}
              </Typography>
            </>
          )}
        </div>
        <Box className={classes.gutterBottom}>
          {data ? (
            <>
              {data?.task.tags.map((tag) => {
                return <Chip className={classes.chip} color='primary' key={tag.id} label={tag.title} size='small' />;
              })}
            </>
          ) : (
            <ChipSkeleton chipsAmount={5} />
          )}
        </Box>
        <TextMarkDownWithLink text={data?.task.description} />
        <Comments employeeTask={employee_task_id} />
      </>
    </Modal>
  );
};

export default InfoModal;
