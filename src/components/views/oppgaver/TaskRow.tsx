import Launch from '@mui/icons-material/Launch';
import Mail from '@mui/icons-material/Mail';
import { Theme } from '@mui/material/';
import ButtonBase from '@mui/material/ButtonBase';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
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
import { useRouter } from 'next/router';
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

/**
 * Display a specific task
 * @param {IEmployeeTask} params
 * @returns TaskRow
 */
const TaskRow = ({ data }: { data: IEmployeeTask }) => {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(data.completed);
  const showSnackbar = useSnackbar();
  const router = useRouter();
  return (
    <TableRow sx={{ border: 0, padding: '0' }}>
      <TableCell sx={{ border: 0, padding: 0 }}>
        <Checkbox
          checked={completed}
          color='primary'
          inputProps={{ 'aria-label': `Marker oppgave som ${completed ? 'ikke' : ''} fullført` }}
          onClick={() => toggleCheckBox(data, completed, setCompleted, showSnackbar)}
        />
        <ButtonBase className={classes.textButton} focusRipple onClick={() => setModalIsOpen(true)}>
          <Typography className={completed ? classes.completedTask : undefined} noWrap style={{ maxWidth: '50vw' }}>
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
      <TableCell sx={{ border: 0, padding: 0 }}>
        <ButtonBase className={classNames(classes.avatarRoot, classes.onClick)} focusRipple onClick={() => router.push(`/ansatt/${data.employee.id}`)}>
          <Avatar className={classes.avatar} firstName={data.employee.firstName} image={data.employee.imageUrl} lastName={data.employee.lastName} />
          <Typography noWrap>{`${data.employee.firstName} ${data.employee.lastName[0]}.`}</Typography>
        </ButtonBase>
      </TableCell>
      <TableCell sx={{ border: 0, padding: 0 }}>
        <div className={classes.avatarRoot}>{format(new Date(data.dueDate), 'dd.MMM')}</div>
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;
