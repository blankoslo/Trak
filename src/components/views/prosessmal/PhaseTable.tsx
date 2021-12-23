import { Table, TableBody, TableCell, TableHead, TableRow, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddButton from 'components/AddButton';
import TaskRow from 'components/views/prosessmal//TaskRow';
import TaskModal from 'components/views/prosessmal/TaskModal';
import { useState } from 'react';
import { IPhase, ITask } from 'utils/types';

/**
 * @typedef {object} PhaseTableProps
 * @property {IPhase} phase
 */
export type PhaseTableProps = {
  phase: IPhase;
};

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    width: '100%',
  },
  hideLastBorder: {
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
  headerCell: {
    color: theme.palette.text.disabled,
    paddingBottom: 0,
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarSize: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
}));

/**
 * Table to display the phase with the different tasks
 * @param {PhaseTableProps} params
 * @returns PhaseTable
 */
const PhaseTable = ({ phase }: PhaseTableProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const classes = useStyles();
  return (
    <Table aria-label='Prosessmal tabell' className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.headerCell} size='small'>
            Tittel
          </TableCell>
          <TableCell className={classes.headerCell} size='small' sx={{ display: { md: 'table-cell', xs: 'none' } }}>
            Beskrivelse
          </TableCell>
          <TableCell className={classes.headerCell} size='small' sx={{ display: { lg: 'table-cell', xs: 'none' } }}>
            Rolle
          </TableCell>
          <TableCell className={classes.headerCell} size='small' sx={{ display: { sm: 'table-cell', xs: 'none' } }}>
            Ansvarlig
          </TableCell>
          <TableCell className={classes.headerCell} component='td' size='small'></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {phase.tasks.map((task: ITask) => (
          <TaskRow key={task.id} phase={phase} task={task} />
        ))}
        <TableRow className={classes.hideLastBorder}>
          <TableCell>
            <AddButton
              onClick={() => {
                setModalIsOpen(true);
              }}
              text='Legg til oppgave'
            />
            {modalIsOpen && <TaskModal closeModal={() => setModalIsOpen(false)} modalIsOpen={modalIsOpen} phase={phase} />}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default PhaseTable;
