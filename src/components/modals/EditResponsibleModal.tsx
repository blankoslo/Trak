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
            createdBy: user.id,
          });
        }

        router
          .push({
            pathname: router.asPath,
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
