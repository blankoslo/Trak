import Button from '@mui/material/Button';
import axios from 'axios';
import TextField from 'components/form/TextField';
import Modal from 'components/Modal';
import useSnackbar from 'context/Snackbar';
import format from 'date-fns/format';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IEmployeeTask } from 'utils/types';

export type EditDueDateModalProps = {
  isModalOpen: boolean;
  employeeTask: IEmployeeTask;
  closeModal: () => void;
};

const EditDueDateModal = ({ employeeTask, isModalOpen, closeModal }: EditDueDateModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const buttonGroup = [
    <Button key='cancel' onClick={closeModal} sx={{ textTransform: 'capitalize' }} type='button'>
      Avbryt
    </Button>,
    <Button key='update' sx={{ textTransform: 'capitalize' }} type='submit'>
      Oppdater
    </Button>,
  ];

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setIsSaving(true);
      await axios.put(`/api/employeeTasks/${employeeTask.id}`, {
        completed: employeeTask.completed,
        dueDate: new Date(formData.dueDate),
        responsibleId: employeeTask.responsible.id,
      });

      router
        .push({
          pathname: router.asPath,
        })
        .finally(() => {
          closeModal();
          showSnackbar('Forfallsdato endret', 'success');
        });
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Noe gikk galt', 'error');
    } finally {
      setIsSaving(false);
    }
  });

  return (
    <Modal buttonGroup={buttonGroup} header={'Endre forfallsdato'} loading={isSaving} onClose={closeModal} onSubmit={onSubmit} open={isModalOpen}>
      <TextField
        defaultValue={format(new Date(employeeTask.dueDate), 'yyyy-MM-dd')}
        errors={errors}
        inputProps={{ 'aria-label': 'Skriv inn forfallsdato' }}
        label='Forfallsdato'
        name='dueDate'
        register={register}
        rules={{ required: 'Du må skrive inn en gyldig dato' }}
        type='date'
      />
    </Modal>
  );
};

export default EditDueDateModal;
