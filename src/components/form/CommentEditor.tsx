import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from 'components/form/TextField';
import { Dispatch, SetStateAction } from 'react';

type CommentEditorProps = {
  onSubmit: () => void;
  // eslint-disable-next-line
  errors: any;
  // eslint-disable-next-line
  register: any;
  cancel: Dispatch<SetStateAction<boolean>>;
  cancelText: string;
  confirmText: string;
};
const CommentEditor = ({ onSubmit, errors, register, cancel, cancelText, confirmText }: CommentEditorProps) => {
  return (
    <form noValidate style={{ marginTop: '32px' }}>
      <TextField
        errors={errors}
        label='Kommentar'
        minRows={2}
        multiline
        name='comment'
        register={register}
        required
        rules={{
          required: 'Kommentar er påkrevd',
        }}
        sx={{ width: '100%' }}
      />
      <Box display='flex' flexDirection='row' justifyContent='space-between'>
        <Button onClick={() => cancel(false)} type='submit'>
          {cancelText}
        </Button>
        <Button onClick={onSubmit} type='submit'>
          {confirmText}
        </Button>
      </Box>
    </form>
  );
};
export default CommentEditor;
