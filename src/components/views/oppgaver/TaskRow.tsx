import Launch from '@mui/icons-material/Launch';
import Mail from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Theme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import Avatar from 'components/Avatar';
import InfoModal from 'components/InfoModal';
import useSnackbar from 'context/Snackbar';
import { format } from 'date-fns';
import { differenceInCalendarDays } from 'date-fns/esm';
import Link from 'next/link';
import { useState } from 'react';
import { IEmployeeTask } from 'utils/types';
import { toggleCheckBox } from 'utils/utils';
import validator from 'validator';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  completedTask: {
    textDecoration: 'line-through',
  },
  avatarRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    height: '100%',
  },
  onClick: {
    width: 'max-content',
    borderRadius: '4px',
    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.text.secondary,
    },
  },
  textButton: {
    textTransform: 'none',
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
    '&:hover': {
      background: theme.palette.text.secondary,
      borderRadius: theme.spacing(0.5),
    },
  },
}));
const TaskRow = ({ data, displayResponsible }: { data: IEmployeeTask; displayResponsible: boolean }) => {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(data.completed);
  const showSnackbar = useSnackbar();
  const daysBeforeDueDate = differenceInCalendarDays(new Date(data.dueDate), new Date());

  const hasExpired = daysBeforeDueDate < 0;

  return (
    <TableRow sx={{ border: 0, padding: '0' }}>
      <TableCell sx={{ border: 0, padding: 0, whiteSpace: 'nowrap' }}>
        <Checkbox
          checked={completed}
          color='primary'
          inputProps={{ 'aria-label': `Marker oppgave som ${completed ? 'ikke' : ''} fullført` }}
          onClick={() => toggleCheckBox(data, completed, setCompleted, showSnackbar)}
        />
        <ButtonBase className={classes.textButton} focusRipple onClick={() => setModalIsOpen(true)} sx={{ marginRight: 1 }}>
          <Typography
            className={completed ? classes.completedTask : undefined}
            noWrap
            sx={{ maxWidth: '40vw', color: hasExpired ? 'error.main' : 'text.primary' }}
          >
            {data.task.title}
          </Typography>
        </ButtonBase>
        {data.task.link && (
          <Tooltip title={data.task.link}>
            <a href={`${validator.isEmail(data.task.link) ? 'mailto:' : ''}${data.task.link}`} rel='noopener noreferrer' target='_blank'>
              <IconButton disableFocusRipple size='small'>
                {validator.isEmail(data.task.link) ? <Mail color='primary' /> : <Launch color='primary' />}
              </IconButton>
            </a>
          </Tooltip>
        )}
      </TableCell>
      {modalIsOpen && <InfoModal closeModal={() => setModalIsOpen(false)} employee_task_id={data.id} modalIsOpen={modalIsOpen} />}
      <TableCell sx={{ border: 0, padding: 0, textAlign: { sm: 'right' } }}>
        <Link href={`/ansatt/${data.employee.id}`} passHref>
          <ButtonBase className={classNames(classes.avatarRoot, classes.onClick)} focusRipple>
            <Avatar className={classes.avatar} firstName={data.employee.firstName} image={data.employee.imageUrl} lastName={data.employee.lastName} />
            <Typography
              noWrap
              sx={{ color: hasExpired ? 'error.main' : 'text.primary' }}
            >{`${data.employee.firstName} ${data.employee.lastName[0]}.`}</Typography>
          </ButtonBase>
        </Link>
      </TableCell>
      {displayResponsible && (
        <TableCell sx={{ border: 0, padding: 0, textAlign: { sm: 'right' }, display: { md: 'table-cell', xs: 'none' } }}>
          <div className={classes.avatarRoot}>
            <Avatar className={classes.avatar} firstName={data.responsible.firstName} image={data.responsible.imageUrl} lastName={data.responsible.lastName} />
            <Typography
              noWrap
              sx={{ color: hasExpired ? 'error.main' : 'text.primary' }}
            >{`${data.responsible.firstName} ${data.responsible.lastName[0]}.`}</Typography>
          </div>
        </TableCell>
      )}
      <TableCell sx={{ display: { md: 'table-cell', xs: 'none' }, border: 0, padding: 0 }}>
        <Box className={classes.avatarRoot} sx={{ color: hasExpired ? 'error.main' : 'text.primary' }}>
          {daysBeforeDueDate === 0 && 'I dag'}
          {daysBeforeDueDate === 1 && 'I morgen'}
          {daysBeforeDueDate > 1 && daysBeforeDueDate <= 7 && `Om ${daysBeforeDueDate} dager`}
          {(daysBeforeDueDate > 7 || daysBeforeDueDate < 0) && format(new Date(data.dueDate), 'dd.MMM.yy')}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;
