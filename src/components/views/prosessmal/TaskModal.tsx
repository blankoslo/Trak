import HelpIcon from '@mui/icons-material/Help';
import { Box, Button, InputLabel, MenuItem, Select, Theme, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import capitalize from 'capitalize-first-letter';
import BeforeToogle from 'components/form/BeforeToggle';
import EmployeeSelector from 'components/form/EmployeeSelector';
import TagSelector from 'components/form/TagSelector';
import TextField from 'components/form/TextField';
import ToggleButtonGroup from 'components/form/ToggleButtonGroup';
import Modal from 'components/Modal';
import Typo from 'components/Typo';
import { useData } from 'context/Data';
import useProgressbar from 'context/Progressbar';
import useSnackbar from 'context/Snackbar';
import moment from 'moment';
import monthDays from 'month-days';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IEmployee, IPhase, ITag, Offset, Process } from 'utils/types';
import { axiosBuilder } from 'utils/utils';
import validator from 'validator';

export type TaskModalProps = {
  phase: IPhase;
  modalIsOpen: boolean;
  closeModal: () => void;
  task_id?: string;
};

export type TaskData = {
  title: string;
  description?: string;
  professions?: string[];
  responsible?: IEmployee;
  tags?: ITag[];
  dueDate?: Date;
  dueDateDayOffset?: number | null;
  offset: Offset;
  link: string;
  day: number;
  month: number;
};

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    display: 'grid',
    gridTemplateRows: 'auto',
    rowGap: 32,
  },
  error: {
    color: theme.palette.error.main,
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
}));
const TaskModal = ({ phase, modalIsOpen, closeModal, task_id = undefined }: TaskModalProps) => {
  const classes = useStyles();
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const showProgressbar = useProgressbar();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const { professions, tags, employees } = useData();
  const [task, setTask] = useState<TaskData | undefined>(undefined);
  const { register, handleSubmit, errors, control, reset, watch } = useForm({
    reValidateMode: 'onChange',
    defaultValues: useMemo(
      () => ({
        title: task?.title,
        description: task?.description,
        link: task?.link,
        professions: task?.professions,
        tags: task?.tags,
        responsible: task?.responsible,
        dueDate: task?.dueDate,
        dueDateDayOffset: task?.dueDateDayOffset,
        offset: task?.offset,
        day: new Date(phase?.dueDate).getDate(),
        month: new Date(phase?.dueDate).getMonth() + 1,
      }),
      [task],
    ),
  });

  const watchSelectedMonth: number = watch('month');

  const daysInMonth = useMemo(() => {
    return monthDays({ year: 2021, month: watchSelectedMonth });
  }, [watchSelectedMonth]);

  useEffect(() => {
    if (task_id) {
      axios.get(`/api/tasks/${task_id}`).then((res) => {
        const task = {
          ...res.data,
          dueDate: res.data.dueDate ? moment(res.data.dueDate).format('yyyy-MM-DD') : null,
          offset: res.data.dueDateDayOffset <= 0 ? Offset.Before : Offset.After,
          dueDateDayOffset: Math.abs(res.data.dueDateDayOffset) || null,
          day: moment(res.data.dueDate).date() || -1,
          month: moment(res.data.dueDate).month() || -1,
        };
        setTask(task);
      });
    }
  }, [task_id]);

  useEffect(() => {
    const dueDate = new Date(task?.dueDate);
    reset({
      title: task?.title,
      description: task?.description,
      link: task?.link,
      professions: task?.professions,
      tags: task?.tags,
      responsible: task?.responsible,
      dueDate: task?.dueDate,
      dueDateDayOffset: task?.dueDateDayOffset,
      day: dueDate.getDate() || -1,
      month: dueDate.getMonth() || -1,
    });
  }, [task]);

  const axiosTaskModal = (axiosFunc: Promise<unknown>, text: string) => {
    axiosBuilder(axiosFunc, text, router, showProgressbar, showSnackbar, closeModal);
  };

  const onSubmit = handleSubmit((formData: TaskData) => {
    const dueDateDayOffset = !formData.dueDateDayOffset
      ? null
      : formData.offset === Offset.Before
      ? -Math.abs(formData.dueDateDayOffset)
      : Math.abs(formData.dueDateDayOffset);

    const data = {
      data: {
        ...formData,
        ...(phase.processTemplateId === Process.LOPENDE &&
          formData.day >= 0 &&
          formData.month >= 0 && {
            dueDate: moment().set({ month: formData.month, date: formData.day }).toDate(),
          }),
        dueDateDayOffset: dueDateDayOffset,
      },
      phaseId: phase.id,
      global: true,
    };
    if (task_id) {
      axiosTaskModal(axios.put(`/api/tasks/${task_id}`, data), 'Oppgave opprettet');
    } else {
      axiosTaskModal(axios.post('/api/tasks', data), 'Oppgave oppdatert');
    }
  });

  const buttonGroup = confirmDelete
    ? [
        <Typo key={'text'}>Er du sikker?</Typo>,
        <Button key={'cancel'} onClick={() => setConfirmDelete(false)} type='button'>
          Avbryt
        </Button>,
        <Button
          className={classes.error}
          color='inherit'
          key={'delete'}
          onClick={() => axiosTaskModal(axios.delete(`/api/tasks/${task_id}`), 'Oppgave slettet')}
          type='button'>
          Slett
        </Button>,
      ]
    : [
        <Button key={'cancel'} onClick={closeModal} type='button'>
          Avbryt
        </Button>,
        task_id && (
          <Button className={classes.error} color='inherit' key={'delete'} onClick={() => setConfirmDelete(true)} type='button'>
            Slett
          </Button>
        ),
        <Button key={'create'} type='submit'>
          {task_id ? 'Oppdater' : 'Opprett'}
        </Button>,
      ];

  return (
    <Modal
      buttonGroup={buttonGroup}
      header={task_id ? 'Oppdater oppgave' : 'Lag oppgave'}
      onClose={closeModal}
      onSubmit={onSubmit}
      open={modalIsOpen}
      subheader={
        <>
          til <b>{phase.title}</b>
        </>
      }>
      <div className={classes.grid}>
        <TextField
          errors={errors}
          inputProps={{ 'aria-label': 'Rediger oppgavetittel' }}
          label='Oppgavetittel'
          name='title'
          register={register}
          required
          rules={{
            required: 'Oppgavetittel er påkrevd',
          }}
        />
        <TextField
          errors={errors}
          inputProps={{ 'aria-label': 'Rediger oppggavebeskrivelse' }}
          label={
            <>
              Oppgavebeskrivelse{' '}
              <Tooltip
                title={
                  <>
                    Dette feltet støtter{' '}
                    <a href='https://www.markdownguide.org/cheat-sheet/' rel='noreferrer noopener' target='_blank'>
                      markdown
                    </a>
                  </>
                }>
                <HelpIcon fontSize='small' />
              </Tooltip>
            </>
          }
          multiline
          name='description'
          register={register}
          rows={4}
        />
        <TextField
          errors={errors}
          inputProps={{ 'aria-label': 'Rediger hurtiglink' }}
          label={
            <>
              Link{' '}
              <Tooltip title={`Link til nettsted/e-post for å få rask tilgang fra oppgaveoversikten`}>
                <HelpIcon fontSize='small' />
              </Tooltip>
            </>
          }
          name='link'
          register={register}
          rules={{
            validate: {
              isLinkOrEmail: (tekst) => validator.isEmail(tekst) || validator.isURL(tekst) || !tekst || 'Linken må være en gyldig URL eller E-post',
            },
          }}
        />
        <ToggleButtonGroup control={control} name={'professions'} professions={professions} />
        <TagSelector control={control} label='Tags' name='tags' options={tags} />
        <EmployeeSelector control={control} employees={employees} label='Oppgaveansvarlig' name='responsible' />
        {phase.processTemplateId === 'lopende' && (
          <Box>
            <Typo variant='body1'>
              Overskriv forfallsdato
              <Tooltip title='Overskriv forfallsdatoen satt for fasen for hvilken årlig dato skal oppgven forfalle?'>
                <HelpIcon fontSize='small' />
              </Tooltip>
            </Typo>
            <Box display='flex' flexDirection='row'>
              <InputLabel htmlFor='select-month' style={{ display: 'none' }}>
                Måned
              </InputLabel>
              <Controller
                as={
                  <Select
                    className={classes.marginRight}
                    inputProps={{ name: 'select-month', id: 'select-month', 'aria-label': 'month' }}
                    style={{ height: '36px' }}>
                    {moment.months().map((month, index) => (
                      <MenuItem key={month} value={index}>
                        {capitalize(month)}
                      </MenuItem>
                    ))}
                  </Select>
                }
                control={control}
                name='month'
              />
              {watchSelectedMonth >= 0 && (
                <>
                  <InputLabel htmlFor='select-day' style={{ display: 'none' }}>
                    Dag
                  </InputLabel>
                  <Controller
                    as={
                      <Select
                        inputProps={{ name: 'select-day', id: 'select-day', 'aria-label': 'day' }}
                        label='Dag'
                        placeholder='Dag'
                        style={{ height: '36px' }}>
                        {[...Array(daysInMonth)].map((val, day) => (
                          <MenuItem key={day} value={day + 1}>
                            {day + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    control={control}
                    name='day'
                  />
                </>
              )}
            </Box>
          </Box>
        )}
        {(phase.processTemplateId === Process.OFFBOARDING || phase.processTemplateId === Process.ONBOARDING) && (
          <div>
            <Box alignItems='center' display='flex'>
              <TextField
                className={classes.marginRight}
                errors={errors}
                inputProps={{
                  min: 0,
                  'aria-label': `Antall dager før/etter oppgaven skal forfalle basert på ${
                    phase.processTemplateId === Process.ONBOARDING ? 'ansettelsdato' : 'termineringsdato'
                  } `,
                }}
                label={
                  <>
                    Overskriv forfallsdato
                    <Tooltip
                      title={`Dette feltet vil overskride forfallsdatoen fra fasen. Forfallsdatoen vil være når oppgaven skal forfalle basert på ${
                        phase.processTemplateId === Process.ONBOARDING ? `ansettelsdato` : `termineringsdato`
                      } `}>
                      <HelpIcon fontSize='small' />
                    </Tooltip>
                  </>
                }
                name='dueDateDayOffset'
                placeholder='Antall dager'
                register={register}
                rules={{
                  min: {
                    value: 0,
                    message: 'Må være større eller lik 0',
                  },
                }}
                type='number'
              />
              <BeforeToogle control={control} name='offset' />
              <Typo variant='body1'>{phase.processTemplateId === Process.ONBOARDING ? 'ansettelsesdato' : 'termineringsdato'}</Typo>
            </Box>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TaskModal;
