import Edit from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import PhaseModal from 'components/views/prosessmal/PhaseModal';
import PhaseTable from 'components/views/prosessmal/PhaseTable';
import { useState } from 'react';
import { IPhase, IProcessTemplate } from 'utils/types';
export type PhaseProps = {
  phase: IPhase;
  processTemplate: IProcessTemplate;
};

const useStyles = makeStyles({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
});

const Phase = ({ phase, processTemplate }: PhaseProps) => {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div className={classes.flexCenter}>
        <Typography sx={{ fontWeight: 'bold' }} variant='h4'>
          {phase.title}
        </Typography>
        <IconButton aria-label={`Endre fase ${phase.title}`} onClick={() => setModalIsOpen(true)}>
          <Edit color='primary' />
        </IconButton>
        {modalIsOpen && <PhaseModal closeModal={() => setModalIsOpen(false)} modalIsOpen={modalIsOpen} phase_id={phase.id} processTemplate={processTemplate} />}
      </div>
      <PhaseTable phase={phase} />
    </div>
  );
};

export default Phase;
