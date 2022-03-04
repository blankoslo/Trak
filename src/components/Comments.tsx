import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AddButton from 'components/AddButton';
import CommentCard from 'components/CommentCard';
import CommentEditor from 'components/form/CommentEditor';
import { useRef, useState } from 'react';
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
  const scrollRef = useRef(null);

  const onSubmit = handleSubmit(async (formData) => {
    const newComment = await axios.post(`/api/employeeTasks/${employeeTask}/comments`, {
      text: formData.comment,
    });
    mutate([...comments, newComment.data]);
    setAddComment(false);
    reset();
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  });
  return (
    <>
      <Box maxHeight={'300px'} overflow={'auto'}>
        <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
          Kommentarer:
        </Typography>
        {comments?.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
        <div ref={scrollRef} />
      </Box>
      {!addComment && <AddButton onClick={() => setAddComment(true)} text='Legg til kommentar' />}
      {addComment && (
        <CommentEditor cancel={setAddComment} cancelText='Avbryt' confirmText='Publiser' errors={errors} onSubmit={onSubmit} register={register} />
      )}
    </>
  );
};
export default Comments;
