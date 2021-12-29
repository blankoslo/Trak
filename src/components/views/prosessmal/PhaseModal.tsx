import HelpIcon from '@mui/icons-material/Help';
import { Box, Button, InputLabel, MenuItem, Select, Theme, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import BeforeToogle from 'components/form/BeforeToggle';
import TextField from 'components/form/TextField';
import Modal from 'components/Modal';
import useProgressbar from 'context/Progressbar';
import useSnackbar from 'context/Snackbar';
import { format, formatISO, getDaysInMonth } from 'date-fns';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IProcessTemplate, Offset, Process } from 'utils/types';
import { axiosBuilder, getMonths } from 'utils/utils';

export type PhaseModalProps = {
  processTemplate: IProcessTemplate;
  modalIsOpen: boolean;
  closeModal: () => void;
  phase_id?: string;
};
export type PhaseData = {
  title: string;
  offset: Offset;
  dueDateDayOffset: number;
  dueDate: string;
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
const PhaseModal = ({ processTemplate, modalIsOpen, closeModal, phase_id = undefined }: PhaseModalProps) => {
  const classes = useStyles();
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const showProgressbar = useProgressbar();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [phase, setPhase] = useState<PhaseData | undefined>(undefined);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues: useMemo(
      () => ({
        title: phase?.title,
        dueDateDayOffset: phase?.dueDateDayOffset,
        offset: phase?.offset,
        dueDate: phase?.dueDate,
        day: new Date(phase?.dueDate).getDate(),
        month: new Date(phase?.dueDate).getMonth() + 1,
      }),
      [phase],
    ),
  });
  const watchSelectedMonth = watch('month');

  const daysInMonth = useMemo(() => {
    return getDaysInMonth(new Date(2021, watchSelectedMonth));
  }, [watchSelectedMonth]);

  useEffect(() => {
    if (phase_id) {
      axios.get(`/api/phases/${phase_id}`).then((res) => {
        const dueDate = new Date(res.data.dueDate);
        setPhase({
          ...res.data,
          dueDate: format(new Date(res.data.dueDate), 'yyyy-MM-dd'),
          offset: res.data.dueDateDayOffset <= 0 ? Offset.Before : Offset.After,
          dueDateDayOffset: Math.abs(res.data.dueDateDayOffset),
          day: dueDate?.getDate() || -1,
          month: dueDate?.getMonth() || -1,
        });
      });
    }
  }, [phase_id]);

  useEffect(() => {
    const dueDate = new Date(phase?.dueDate);
    reset({
      title: phase?.title,
      dueDateDayOffset: phase?.dueDateDayOffset,
      offset: phase?.offset,
      dueDate: phase?.dueDate,
      day: dueDate?.getDate() || new Date().getDate(),
      month: dueDate?.getMonth() || new Date().getMonth(),
    });
  }, [phase]);

  const axiosPhaseModal = (axiosFunc: Promise<unknown>, text: string) => {
    axiosBuilder(axiosFunc, text, router, showProgressbar, showSnackbar, closeModal);
  };

  const onSubmit = handleSubmit((formData: PhaseData) => {
    const dueDate = processTemplate.slug === Process.LOPENDE ? formatISO(new Date().setMonth(formData.month, formData.day)) : null;
    const data = {
      data: {
        ...formData,
        dueDate: dueDate,
        dueDateDayOffset: formData.offset === Offset.Before ? -Math.abs(formData.dueDateDayOffset) : Math.abs(formData.dueDateDayOffset),
      },
      processTemplateId: processTemplate.slug,
    };
    if (phase_id) {
      axiosPhaseModal(axios.put(`/api/phases/${phase_id}`, data), 'Fasen ble oppdatert');
    } else {
      axiosPhaseModal(axios.post('/api/phases', data), 'Fasen ble opprettet');
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
          onClick={() => axiosPhaseModal(axios.delete(`/api/phases/${phase_id}`), 'Fase slettet')}
          type='button'
        >
          Slett
        </Button>,
      ]
    : [
        <Button key={'cancel'} onClick={closeModal} type='button'>
          Avbryt
        </Button>,
        phase_id && (
          <Button className={classes.error} color='inherit' key={'delete'} onClick={() => setConfirmDelete(true)} type='button'>
            Slett
          </Button>
        ),
        <Button key={'create'} type='submit'>
          {phase_id ? 'Oppdater' : 'Opprett'}
        </Button>,
      ];
  return (
    <Modal
      buttonGroup={buttonGroup}
      header={phase_id ? 'Oppdater fase' : 'Lag fase'}
      onClose={closeModal}
      onSubmit={onSubmit}
      open={modalIsOpen}
      subheader={
        <>
          til <b>{processTemplate.title}</b>
        </>
      }
    >
      <div className={classes.grid}>
        <TextField
          errors={errors}
          inputProps={{ 'aria-label': 'Skriv inn fasetittel' }}
          label='Fasetittel'
          name='title'
          register={register}
          required
          rules={{
            required: 'Fasetittel er påkrevd',
          }}
        />
        {(processTemplate.slug === Process.ONBOARDING || processTemplate.slug === Process.OFFBOARDING) && (
          <div>
            <Box alignItems='center' display='flex'>
              <TextField
                className={classes.marginRight}
                errors={errors}
                inputProps={{
                  min: 0,
                  'aria-label': `Antall dager før/etter oppgavene skal forfalle basert på ${
                    processTemplate.slug === Process.ONBOARDING ? 'ansettelsdato' : 'termineringsdato'
                  } `,
                }}
                label={
                  <>
                    Forfaller
                    <Tooltip
                      title={`Når oppgavene i fasen skal forfalle basert på ${
                        processTemplate.slug === Process.ONBOARDING ? `ansettelsdato` : `termineringsdato`
                      } `}
                    >
                      <HelpIcon fontSize='small' />
                    </Tooltip>
                  </>
                }
                name='dueDateDayOffset'
                placeholder='Antall dager'
                register={register}
                required
                rules={{
                  min: {
                    value: 0,
                    message: 'Må være større eller lik 0',
                  },
                }}
                type='number'
              />
              <BeforeToogle control={control} name='offset' />
              <Typography variant='body1'>{processTemplate.slug === Process.ONBOARDING ? 'ansettelsesdato' : 'termineringsdato'}</Typography>
            </Box>
          </div>
        )}
        {processTemplate.slug === Process.LOPENDE && (
          <>
            <Box>
              <Typography variant='body1'>
                Forfallsdato
                <Tooltip title='Hvilken årlig dato skal oppgavene i fasen forfalle?'>
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
                      value={value}
                    >
                      {getMonths().map((month, index) => (
                        <MenuItem key={month} value={index}>
                          {capitalize(month)}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  rules={{ required: true }}
                />
                {!isNaN(watchSelectedMonth) && (
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
                          value={value}
                        >
                          {[...Array(daysInMonth)].map((val, day) => (
                            <MenuItem key={day} value={day + 1}>
                              {day + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                      rules={{ required: true }}
                    />
                  </>
                )}
              </Box>
            </Box>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PhaseModal;
