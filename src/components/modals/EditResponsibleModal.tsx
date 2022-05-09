import Button from '@mui/material/Button';
import axios from 'axios';
import EmployeeSelector from 'components/form/EmployeeSelector';
import Modal from 'components/Modal';
import useSnackbar from 'context/Snackbar';
import { useUser } from 'context/User';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IEmployeeTask } from 'utils/types';

export type EditResponsibleModalProps = {
  isModalOpen: boolean;
  employeeTask: IEmployeeTask;
  closeModal: () => void;
};

const EditResponsibleModal = ({ employeeTask, isModalOpen, closeModal }: EditResponsibleModalProps) => {
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { user } = useUser();
  const { control, handleSubmit } = useForm({
    reValidateMode: 'onChange',
    defaultValues: useMemo(
      () => ({
        responsible: employeeTask?.responsible,
      }),
      [employeeTask, employeeTask?.responsible],
    ),
  });

  const buttonGroup = [
    <Button key='cancel' onClick={closeModal} type='button'>
      Avbryt
    </Button>,
    <Button key='update' type='submit'>
      Oppdater
    </Button>,
  ];

  const onSubmit = handleSubmit(async (formData) => {
    if (formData.responsible?.id !== employeeTask.responsible.id) {
      try {
        setIsSaving(true);
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
        router
          .push({ pathname: router.pathname, query: router.query }, undefined, {
            shallow: false,
            scroll: false,
          })
          .finally(() => {
            closeModal();
            setIsSaving(false);
            showSnackbar('Ansvarlig byttet', 'success');
          });
      } catch (error) {
        showSnackbar(error.response?.data?.message || 'Noe gikk galt', 'error');
      } finally {
        setIsSaving(false);
      }
    } else {
      showSnackbar('Kan ikke bytte til samme ansvarlig', 'error');
    }
  });

  return (
    <>
      <Modal buttonGroup={buttonGroup} header={'Endre oppgaveansvarlig'} loading={isSaving} onClose={closeModal} onSubmit={onSubmit} open={isModalOpen}>
        <EmployeeSelector control={control} label='Oppgaveansvarlig' name='responsible' required />
      </Modal>
    </>
  );
};

export default EditResponsibleModal;
