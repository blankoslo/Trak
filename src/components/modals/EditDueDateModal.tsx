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
    <Button key='cancel' onClick={closeModal} type='button'>
      Avbryt
    </Button>,
    <Button key='update' type='submit'>
      Oppdater
    </Button>,
  ];

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setIsSaving(true);
      await axios.put(`/api/employeeTasks/${employeeTask.id}`, {
        completed: employeeTask.completed,
        due_date: new Date(formData.due_date),
        responsible_id: employeeTask.responsible.id,
      });

      router
        .push({ pathname: `/ansatt/${employeeTask.employee_id}`, query: { process: employeeTask.task.phase.process_template.slug } }, undefined, {
          shallow: false,
          scroll: false,
        })
        .finally(() => {
          closeModal();
          setIsSaving(false);
          showSnackbar('Forfallsdato endret', 'success');
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showSnackbar(error?.response?.data?.message || 'Noe gikk galt', 'error');
    } finally {
      setIsSaving(false);
    }
  });

  return (
    <Modal buttonGroup={buttonGroup} header={'Endre forfallsdato'} loading={isSaving} onClose={closeModal} onSubmit={onSubmit} open={isModalOpen}>
      <TextField
        defaultValue={format(new Date(employeeTask.due_date), 'yyyy-MM-dd')}
        errors={errors}
        inputProps={{ 'aria-label': 'Skriv inn forfallsdato' }}
        label='Forfallsdato'
        name='due_date'
        register={register}
        rules={{ required: 'Du må skrive inn en gyldig dato' }}
        type='date'
      />
    </Modal>
  );
};

export default EditDueDateModal;
