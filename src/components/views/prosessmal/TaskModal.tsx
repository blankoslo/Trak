import HelpIcon from '@mui/icons-material/Help';
import { Stack } from '@mui/material';
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
import TextField from 'components/form/TextField';
import ToggleButtonGroup from 'components/form/ToggleButtonGroup';
import MarkdownEditor from 'components/MarkdownEditor';
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
import { IEmployee, IPhase, Offset, Process, ResponsibleType } from 'utils/types';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any; // Any because markdownEditor does not return a string but an object of the actualt markdown text and html
  professions?: string[];
  responsible?: IEmployee;
  due_date?: Date;
  due_date_day_offset?: number | null;
  responsible_type: ResponsibleType;
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

  const { professions } = useData();
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
        responsible: task?.responsible,
        responsible_type: task?.responsible_type,
        due_date: task?.due_date,
        due_date_day_offset: task?.due_date_day_offset,
        offset: task?.offset,
        day: new Date(phase?.due_date).getDate(),
        month: new Date(phase?.due_date).getMonth() + 1,
      }),
      [task],
    ),
  });
  // "HR_MANAGER"
  // @ts-ignore
  const watchSelectedMonth: number = watch('month');
  const watchShowTaskResponsible = watch('responsible_type');

  const daysInMonth = useMemo(() => {
    return getDaysInMonth(new Date(2021, watchSelectedMonth));
  }, [watchSelectedMonth]);

  useEffect(() => {
    if (task_id) {
      axios.get(`/api/tasks/${task_id}`).then((res) => {
        const due_date = new Date(res.data.due_date);
        const task = {
          ...res.data,
          due_date: res.data.due_date ? format(new Date(res.data.due_date), 'yyyy-MM-dd') : null,
          offset: res.data.due_date_day_offset <= 0 ? Offset.Before : Offset.After,
          due_date_day_offset: Math.abs(res.data.due_date_day_offset) || null,
          day: due_date?.getDate() || -1,
          month: due_date?.getMonth() || -1,
        };
        setTask(task);
      });
    }
  }, [task_id]);

  useEffect(() => {
    const due_date = new Date(task?.due_date);
    reset({
      title: task?.title,
      description: task?.description,
      link: task?.link,
      professions: task?.professions,
      responsible: task?.responsible,
      responsible_type: task?.responsible_type,
      due_date: task?.due_date,
      due_date_day_offset: task?.due_date_day_offset,
      day: due_date.getDate() || -1,
      month: due_date.getMonth() || -1,
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
    const due_date_day_offset = !formData.due_date_day_offset
      ? null
      : formData.offset === Offset.Before
      ? -Math.abs(formData.due_date_day_offset)
      : Math.abs(formData.due_date_day_offset);
    const data = {
      data: {
        ...formData,
        ...(phase.process_template_id === Process.LOPENDE &&
          formData.day >= 0 &&
          formData.month >= 0 && {
            due_date: formatISO(new Date().setMonth(formData.month, formData.day)),
          }),
        description: formData.description?.text,
        due_date_day_offset: due_date_day_offset,
        responsible: formData.responsible_type === ResponsibleType.OTHER ? formData.responsible : null,
      },
      phase_id: phase.id,
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
        <Stack spacing={1}>
          <Typography variant='body1'>Beskrivelse</Typography>
          <MarkdownEditor control={control} name='description' />
        </Stack>
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
        <FormControl>
          <Typography variant='body1'>Oppgaveansvarlig</Typography>
          <Controller
            control={control}
            defaultValue={ResponsibleType.HR_MANAGER}
            name='responsible_type'
            render={({ field }) => {
              return (
                <RadioGroup {...field} row>
                  <FormControlLabel control={<Radio />} label='Personalansvarlig' value={ResponsibleType.HR_MANAGER} />
                  {phase.process_template_id === 'lopende' && (
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
        {phase.process_template_id === 'lopende' && (
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
        {(phase.process_template_id === Process.OFFBOARDING || phase.process_template_id === Process.ONBOARDING) && (
          <div>
            <Box alignItems='center' display='flex'>
              <TextField
                className={classes.marginRight}
                errors={errors}
                inputProps={{
                  min: 0,
                  'aria-label': `Antall dager før/etter oppgaven skal forfalle basert på ${
                    phase.process_template_id === Process.ONBOARDING ? 'ansettelsdato' : 'termineringsdato'
                  } `,
                }}
                label={
                  <>
                    Overskriv forfallsdato
                    <Tooltip
                      title={`Dette feltet vil overskride forfallsdatoen fra fasen. Forfallsdatoen vil være når oppgaven skal forfalle basert på ${
                        phase.process_template_id === Process.ONBOARDING ? `ansettelsdato` : `termineringsdato`
                      } `}
                    >
                      <HelpIcon fontSize='small' />
                    </Tooltip>
                  </>
                }
                name='due_date_day_offset'
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
              <Typography variant='body1'>{phase.process_template_id === Process.ONBOARDING ? 'ansettelsesdato' : 'termineringsdato'}</Typography>
            </Box>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TaskModal;
