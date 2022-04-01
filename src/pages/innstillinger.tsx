import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Avatar from 'components/Avatar';
import useSnackbar from 'context/Snackbar';
import { trakClient } from 'lib/prisma';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import safeJsonStringify from 'safe-json-stringify';
import { IEmployeeSettings } from 'utils/types';
import { prismaDateToFormatedDate } from 'utils/utils';
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const employeeQuery = await trakClient.employee.findUnique({
    where: {
      id: parseInt(session?.user?.id) || null,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      email: true,
      birthDate: true,
      dateOfEmployment: true,
      hrManager: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      profession: {
        select: {
          title: true,
        },
      },
      employeeSettings: true,
    },
  });

  const employee = JSON.parse(safeJsonStringify(employeeQuery));

  return { props: { employee } };
};

const Settings: NextPage = ({ employee }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container maxWidth='md' sx={{ paddingTop: { xs: 2, md: 7 }, paddingBottom: 8 }}>
      <Stack
        alignItems={{ xs: 'center', sm: 'center', md: 'flex-start' }}
        direction={{ xs: 'column', sm: 'row', md: 'row' }}
        justifyContent='space-evenly'
        spacing={2}
        sx={{ width: '100%' }}
      >
        <Stack direction='column' spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
          <PersonaliaPaper employee={employee} />
          <UpdateSystemPaper />
        </Stack>
        <Stack direction='column' spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
          <NotificationPaper employee={employee} />
        </Stack>
      </Stack>
    </Container>
  );
};

const PersonaliaPaper = ({ employee }) => {
  const theme = useTheme();
  return (
    <Paper sx={{ padding: 2, width: { xs: 'auto', sm: 'auto', md: 'fit-content' } }}>
      <Stack alignItems='flex-start' direction='column' spacing={1}>
        <Typography variant='h2'>Personalia</Typography>
        <Typography sx={{ opacity: '0.85' }} variant='body2'>
          kort oppsummering av din informasjon. <br />
          om noe er galt kan du endre det{' '}
          <a
            href='https://inni.blank.no/employees'
            rel='noopener noreferrer'
            style={{ color: `${theme.palette.primary.main}`, textDecoration: 'none' }}
            target='_blank'
          >
            her
          </a>
        </Typography>
        <Stack alignItems='center' direction='row' spacing={1}>
          <Avatar firstName={employee.firstName} image={employee.imageUrl} lastName={employee.lastName} sx={{ width: 80, height: 80 }} />
          <Stack alignItems='flex-start' direction='column' spacing={0.5}>
            <PersonaliaText smallText={''} text={`${employee.firstName} ${employee.lastName}`} />
            <PersonaliaText smallText={''} text={employee.email} />
          </Stack>
        </Stack>
        <PersonaliaText smallText={'rolle'} text={employee.profession.title} />
        <PersonaliaText smallText={'startet'} text={prismaDateToFormatedDate(employee.dateOfEmployment)} />
        {employee.hrManager && <PersonaliaText smallText={'ansvarlig'} text={`${employee.hrManager.firstName} ${employee.hrManager.lastName}`} />}
      </Stack>
    </Paper>
  );
};

const UpdateSystemPaper = () => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);

  const cronButton = async () => {
    setLoading(true);
    showSnackbar('Initialiserer oppdatering...', 'info');
    axios
      .post(`/api/cron/phases?notification=false`)
      .then(() => showSnackbar('Systemet er oppdatert', 'success'))
      .catch((err) => showSnackbar(err.response?.data?.message || 'Noe gikk galt', 'error'))
      .finally(() => setLoading(false));
  };
  return (
    <Paper sx={{ padding: 2, width: 'auto' }}>
      <Stack alignItems='flex-start' direction='column' spacing={1}>
        <Typography variant='h2'>Oppdater TRAK</Typography>
        <Typography sx={{ opacity: '0.85' }} variant='body2'>
          oppdater trak med nyeste dataen <br /> fra ansattlisten til blank
        </Typography>
        <Button disabled={loading} fullWidth onClick={cronButton}>
          Trykk for å oppdatere
        </Button>
      </Stack>
    </Paper>
  );
};

type ToggleProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  defaultValue: boolean;
  onSubmit: () => void;
  loading: boolean;
  label: string;
};

const Toggle = ({ control, name, defaultValue, onSubmit, loading, label }: ToggleProps) => {
  return (
    <FormControlLabel
      control={
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={name}
          render={({ field: { value, onChange } }) => {
            return (
              <Switch
                checked={value}
                onChange={(e) => {
                  onChange(e);
                  onSubmit();
                }}
              />
            );
          }}
        />
      }
      disabled={loading}
      label={label}
    />
  );
};

const NotificationPaper = ({ employee }) => {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const showSnackbar = useSnackbar();

  const onSubmit = handleSubmit(async (formData: IEmployeeSettings) => {
    setLoading(true);
    await axios
      .put(`/api/employees/${employee?.id}/settings`, { data: formData })
      .then(() => {
        router.push(
          {
            pathname: router.asPath,
          },
          undefined,
          { scroll: false },
        );
        setLoading(false);
        showSnackbar('Innstillinger oppdatert', 'success');
      })
      .catch((err) => showSnackbar(err.response?.data?.message || 'Noe gikk galt', 'error'));
  });

  return (
    <Paper sx={{ width: { xs: 'auto', sm: 'auto', md: 'fit-content' } }}>
      <Stack alignItems='flex-start' direction='column' spacing={1} sx={{ padding: 2 }}>
        <Typography variant='h2'>Notifikasjoner</Typography>
        <Typography sx={{ opacity: '0.85' }} variant='body2'>
          kontroller dine slack og trak <br /> relaterte notifikasjoner
        </Typography>
        <FormControl>
          <Toggle
            control={control}
            defaultValue={employee.employeeSettings.slack}
            label='Slack notifikasjoner'
            loading={loading}
            name='slack'
            onSubmit={onSubmit}
          />
          <Divider sx={{ marginBottom: 1, backgroundColor: 'text.primary' }} />
          <Typography sx={{ opacity: '0.85' }} variant='body2'>
            kontroller hvilken type <br /> notifikasjoner du ønsker
          </Typography>
          <Toggle
            control={control}
            defaultValue={employee.employeeSettings.delegate}
            label='Delegering av oppgave'
            loading={loading}
            name='delegate'
            onSubmit={onSubmit}
          />
          <Toggle
            control={control}
            defaultValue={employee.employeeSettings.deadline}
            label='Oppgave forfaller'
            loading={loading}
            name='deadline'
            onSubmit={onSubmit}
          />
          <Toggle
            control={control}
            defaultValue={employee.employeeSettings.week_before_deadline}
            label='En uke før oppgave(r) forfaller'
            loading={loading}
            name='week_before_deadline'
            onSubmit={onSubmit}
          />
          <Toggle control={control} defaultValue={employee.employeeSettings.hired} label='Ny ansatt' loading={loading} name='hired' onSubmit={onSubmit} />
          <Toggle
            control={control}
            defaultValue={employee.employeeSettings.termination}
            label='Ansatt slutter'
            loading={loading}
            name='termination'
            onSubmit={onSubmit}
          />
        </FormControl>
      </Stack>

      {loading && <LinearProgress />}
    </Paper>
  );
};

export const PersonaliaText = ({ smallText, text }) => {
  return (
    <Stack alignItems='flex-end' direction='row' spacing={1}>
      {smallText && <Typography sx={{ opacity: '0.85' }} variant='body2'>{`${smallText}:`}</Typography>}
      <Typography noWrap>{text}</Typography>
    </Stack>
  );
};
export default Settings;
