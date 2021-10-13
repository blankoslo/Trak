import HelpIcon from '@mui/icons-material/Help';
import { Box, Button, InputLabel, MenuItem, Select, Theme, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import capitalize from 'capitalize-first-letter';
import BeforeToogle from 'components/form/BeforeToggle';
import TextField from 'components/form/TextField';
import Modal from 'components/Modal';
import Typo from 'components/Typo';
import useProgressbar from 'context/Progressbar';
import useSnackbar from 'context/Snackbar';
import moment from 'moment';
import monthDays from 'month-days';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IProcessTemplate, Offset, Process } from 'utils/types';
import { axiosBuilder } from 'utils/utils';

/**
 * @typedef {object} PhaseModalProps
 * @property {IProcessTemplate} processTemplate
 * @property {boolean} modalIsOpen
 * @property {function} closeModal
 * @property {string} phase_id
 */
export type PhaseModalProps = {
  processTemplate: IProcessTemplate;
  modalIsOpen: boolean;
  closeModal: () => void;
  phase_id?: string;
};

/**
 * @typedef {object} PhaseData
 * @property {string} title
 * @property {Offset} offset
 * @property {number} dueDateDayOffset
 * @property {string} dueDate
 * @property {number} day
 * @property {number} month
 */
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

/**
 * Modal to make changes to or create a new phase
 * @param {PhaseModalProps} params
 * @returns PhaseModal
 */
const PhaseModal = ({ processTemplate, modalIsOpen, closeModal, phase_id = undefined }: PhaseModalProps) => {
  const classes = useStyles();
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const showProgressbar = useProgressbar();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [phase, setPhase] = useState<PhaseData | undefined>(undefined);
  const { register, handleSubmit, control, errors, reset, watch } = useForm({
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
    return monthDays({ year: 2021, month: watchSelectedMonth });
  }, [watchSelectedMonth]);

  useEffect(() => {
    if (phase_id) {
      axios.get(`/api/phases/${phase_id}`).then((res) => {
        const dueDate = new Date(res.data.dueDate);
        setPhase({
          ...res.data,
          dueDate: moment(res.data.dueDate).format('yyyy-MM-DD'),
          offset: res.data.dueDateDayOffset <= 0 ? Offset.Before : Offset.After,
          dueDateDayOffset: Math.abs(res.data.dueDateDayOffset),
          day: dueDate?.getDate(),
          month: dueDate?.getMonth(),
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
      day: dueDate.getDate() || new Date().getDate(),
      month: dueDate.getMonth() || new Date().getMonth(),
    });
  }, [phase]);

  const axiosPhaseModal = (axiosFunc: Promise<unknown>, text: string) => {
    axiosBuilder(axiosFunc, text, router, showProgressbar, showSnackbar, closeModal);
  };
  const onSubmit = handleSubmit((formData: PhaseData) => {
    const dueDate = processTemplate.slug === Process.LOPENDE ? moment().set({ month: formData.month, date: formData.day }).toDate() : null;
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
        <Typo key={'text'}>Er du sikker?</Typo>,
        <Button key={'cancel'} onClick={() => setConfirmDelete(false)} type='button'>
          Avbryt
        </Button>,
        <Button
          className={classes.error}
          color='inherit'
          key={'delete'}
          onClick={() => axiosPhaseModal(axios.delete(`/api/phases/${phase_id}`), 'Fase slettet')}
          type='button'>
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
      }>
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
                      } `}>
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
              <Typo variant='body1'>{processTemplate.slug === Process.ONBOARDING ? 'ansettelsesdato' : 'termineringsdato'}</Typo>
            </Box>
          </div>
        )}
        {processTemplate.slug === Process.LOPENDE && (
          <>
            <Box>
              <Typo variant='body1'>
                Forfallsdato
                <Tooltip title='Hvilken årlig dato skal oppgavene i fasen forfalle?'>
                  <HelpIcon fontSize='small' />
                </Tooltip>
              </Typo>
              <Box display='flex' flexDirection='row'>
                <InputLabel htmlFor='select-month' style={{ display: 'none' }}>
                  Måned
                </InputLabel>
                <Controller
                  as={
                    <Select className={classes.marginRight} inputProps={{ name: 'select-month', id: 'select-month', 'aria-label': 'month' }}>
                      {moment.months().map((month, index) => (
                        <MenuItem key={month} value={index}>
                          {capitalize(month)}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  control={control}
                  name='month'
                  rules={{ required: true }}
                />
                {!isNaN(watchSelectedMonth) && (
                  <>
                    <InputLabel htmlFor='select-day' style={{ display: 'none' }}>
                      Dag
                    </InputLabel>
                    <Controller
                      as={
                        <Select inputProps={{ name: 'select-day', id: 'select-day', 'aria-label': 'day' }} label='Dag' placeholder='Dag'>
                          {[...Array(daysInMonth)].map((val, day) => (
                            <MenuItem key={day} value={day + 1}>
                              {day + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      }
                      control={control}
                      name='day'
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
