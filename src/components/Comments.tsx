import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import AddButton from 'components/AddButton';
import CommentCard from 'components/CommentCard';
import TextField from 'components/form/TextField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { fetcher } from 'utils/utils';
type CommentProps = {
  employeeTask: string;
};

const Comments = ({ employeeTask }: CommentProps) => {
  const { data: comments, mutate } = useSWR(`/api/employeeTasks/${employeeTask}/comments`, fetcher);
  const [addComment, setAddComment] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    const newComment = await axios.post(`/api/employeeTasks/${employeeTask}/comments`, {
      text: formData.comment,
    });
    mutate([...comments, newComment.data]);
    setAddComment(false);
    reset();
  });
  return (
    <>
      {comments?.map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
      {!addComment && <AddButton onClick={() => setAddComment(true)} text='Legg til kommentar' />}
      {addComment && (
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
            <Button onClick={() => setAddComment(false)} type='submit'>
              Avbryt kommentar{' '}
            </Button>
            <Button onClick={onSubmit} type='submit'>
              Publiser{' '}
            </Button>
          </Box>
        </form>
      )}
    </>
  );
};
export default Comments;
