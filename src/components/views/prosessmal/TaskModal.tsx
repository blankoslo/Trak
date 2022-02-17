import HelpIcon from '@mui/icons-material/Help';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import { Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import BeforeToogle from 'components/form/BeforeToggle';
import EmployeeSelector from 'components/form/EmployeeSelector';
import TagSelector from 'components/form/TagSelector';
import TextField from 'components/form/TextField';
import ToggleButtonGroup from 'components/form/ToggleButtonGroup';
import Modal from 'components/Modal';
import { useData } from 'context/Data';
import useProgressbar from 'context/Progressbar';
import useSnackbar from 'context/Snackbar';
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IEmployee, IPhase, ITag, Offset, Process, ResponsibleType } from 'utils/types';
import { axiosBuilder, getMonths } from 'utils/utils';
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
  responsibleType: ResponsibleType;
  chooseResponsible?: boolean;
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

  const isLinkOrEmail = (tekst) => {
    if (!tekst || validator.isEmail(tekst) || validator.isURL(tekst)) {
      return true;
    }
    return false;
  };

  const { professions, tags } = useData();
  const [task, setTask] = useState<TaskData | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
    watch,
  } = useForm<TaskData>({
    reValidateMode: 'onChange',
    defaultValues: useMemo(
      () => ({
        title: task?.title,
        description: task?.description,
        link: task?.link,
        professions: task?.professions,
        tags: task?.tags,
        responsible: task?.responsible,
        responsibleType: task?.responsibleType,
        chooseResponsible: task?.responsibleType === ResponsibleType.OTHER,
        dueDate: task?.dueDate,
        dueDateDayOffset: task?.dueDateDayOffset,
        offset: task?.offset,
        day: new Date(phase?.dueDate).getDate(),
        month: new Date(phase?.dueDate).getMonth() + 1,
      }),
      [task],
    ),
  });
  // "HR_MANAGER"
  // @ts-ignore
  const watchSelectedMonth: number = watch('month');
  const watchShowTaskResponsible = watch('responsibleType');

  const daysInMonth = useMemo(() => {
    return getDaysInMonth(new Date(2021, watchSelectedMonth));
  }, [watchSelectedMonth]);

  useEffect(() => {
    if (task_id) {
      axios.get(`/api/tasks/${task_id}`).then((res) => {
        const dueDate = new Date(res.data.dueDate);
        const task = {
          ...res.data,
          dueDate: res.data.dueDate ? format(new Date(res.data.dueDate), 'yyyy-MM-dd') : null,
          offset: res.data.dueDateDayOffset <= 0 ? Offset.Before : Offset.After,
          dueDateDayOffset: Math.abs(res.data.dueDateDayOffset) || null,
          day: dueDate?.getDate() || -1,
          month: dueDate?.getMonth() || -1,
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
      responsibleType: task?.responsibleType,
      chooseResponsible: task?.responsibleType === ResponsibleType.OTHER,
      dueDate: task?.dueDate,
      dueDateDayOffset: task?.dueDateDayOffset,
      day: dueDate.getDate() || -1,
      month: dueDate.getMonth() || -1,
    });
  }, [task]);

  const axiosTaskModal = (axiosFunc: Promise<unknown>, text: string) => {
    axiosBuilder(axiosFunc, text, router, showProgressbar, showSnackbar, closeModal);
  };

  useEffect(() => {
    if (watchShowTaskResponsible !== ResponsibleType.OTHER) {
      resetField('responsible');
    }
  }, [watchShowTaskResponsible]);

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
            dueDate: formatISO(new Date().setMonth(formData.month, formData.day)),
          }),
        dueDateDayOffset: dueDateDayOffset,
        responsible: formData.responsibleType === ResponsibleType.OTHER ? formData.responsible : null,
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
        <Typography key={'text'}>Er du sikker?</Typography>,
        <Button key={'cancel'} onClick={() => setConfirmDelete(false)} type='button'>
          Avbryt
        </Button>,
        <Button
          className={classes.error}
          color='inherit'
          key={'delete'}
          onClick={() => axiosTaskModal(axios.delete(`/api/tasks/${task_id}`), 'Oppgave slettet')}
          type='button'
        >
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
      }
    >
      <div className={classes.grid}>
        <TextField
          errors={errors}
          inputProps={{ 'aria-label': 'Rediger oppgavetittel' }}
          label='Tittel'
          name='title'
          register={register}
          required
          rules={{
            required: 'Oppgavetittel er påkrevd',
          }}
          sx={{ marginTop: 2 }}
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
                }
              >
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
            validate: isLinkOrEmail,
          }}
        />
        <ToggleButtonGroup control={control} name={'professions'} professions={professions} />
        <TagSelector control={control} label='Tags' name='tags' options={tags} />
        <FormControl>
          <Typography variant='body1'>Oppgaveansvarlig</Typography>
          <Controller
            control={control}
            defaultValue={ResponsibleType.HR_MANAGER}
            name='responsibleType'
            render={({ field }) => {
              return (
                <RadioGroup {...field} row>
                  <FormControlLabel control={<Radio />} label='Personalansvarlig' value={ResponsibleType.HR_MANAGER} />
                  {phase.processTemplateId === 'lopende' && (
                    <FormControlLabel control={<Radio />} label='Oppdragsansvarlig' value={ResponsibleType.PROJECT_MANAGER} />
                  )}
                  <FormControlLabel control={<Radio />} label='Annen' value={ResponsibleType.OTHER} />
                </RadioGroup>
              );
            }}
          />
        </FormControl>
        {watchShowTaskResponsible === ResponsibleType.OTHER && (
          <EmployeeSelector control={control} errors={errors} label='Oppgaveansvarlig' name='responsible' required />
        )}
        {phase.processTemplateId === 'lopende' && (
          <Box>
            <Typography variant='body1'>
              Overskriv forfallsdato
              <Tooltip title='Overskriv forfallsdatoen satt for fasen for hvilken årlig dato skal oppgaven forfalle'>
                <HelpIcon fontSize='small' />
              </Tooltip>
            </Typography>
            <Box display='flex' flexDirection='row'>
              <InputLabel htmlFor='select-month' style={{ display: 'none' }}>
                Måned
              </InputLabel>
              <Controller
                control={control}
                name='month'
                render={({ field: { onChange, value } }) => (
                  <Select
                    className={classes.marginRight}
                    inputProps={{ name: 'select-month', id: 'select-month', 'aria-label': 'month' }}
                    onChange={onChange}
                    style={{ height: '36px' }}
                    value={value}
                  >
                    {getMonths().map((month, index) => (
                      <MenuItem key={month} value={index}>
                        {capitalize(month)}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {watchSelectedMonth >= 0 && (
                <>
                  <InputLabel htmlFor='select-day' style={{ display: 'none' }}>
                    Dag
                  </InputLabel>
                  <Controller
                    control={control}
                    name='day'
                    render={({ field: { onChange, value } }) => (
                      <Select
                        inputProps={{ name: 'select-day', id: 'select-day', 'aria-label': 'day' }}
                        label='Dag'
                        onChange={onChange}
                        placeholder='Dag'
                        style={{ height: '36px' }}
                        value={value}
                      >
                        {[...Array(daysInMonth)].map((val, day) => (
                          <MenuItem key={day} value={day + 1}>
                            {day + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
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
                      } `}
                    >
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
              <Typography variant='body1'>{phase.processTemplateId === Process.ONBOARDING ? 'ansettelsesdato' : 'termineringsdato'}</Typography>
            </Box>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TaskModal;
