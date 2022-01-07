import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
export type ModalProps = {
  header?: React.ReactChild | string;
  subheader?: React.ReactChild | string;
  buttonGroup?: React.ReactChild[];
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children?: React.ReactChild;
};
const Modal = ({ header, subheader, buttonGroup, open, onClose, onSubmit, children }: ModalProps) => {
  const classes = useStyles();
  return (
    <Dialog aria-labelledby='modal-title' fullWidth onClose={onClose} open={open}>
      <form noValidate onSubmit={onSubmit}>
        {header && (
          <DialogTitle id='modal-title'>
            <Typography variant='h1'>{header}</Typography>
            {subheader && <Typography variant='body2'>{subheader}</Typography>}
          </DialogTitle>
        )}
        {children && <DialogContent>{children}</DialogContent>}
        {buttonGroup && <DialogActions className={classes.buttonGroup}>{buttonGroup.map((button) => button)}</DialogActions>}
      </form>
    </Dialog>
  );
};

export default Modal;
