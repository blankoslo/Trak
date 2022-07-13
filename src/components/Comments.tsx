import Box from '@mui/material/Box';
import axios from 'axios';
import AddButton from 'components/AddButton';
import CommentCard from 'components/CommentCard';
import CommentEditor from 'components/form/CommentEditor';
import uniqBy from 'lodash/uniqBy';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { IComment, IEmployeeTask } from 'utils/types';
import { fetcher } from 'utils/utils';
type CommentProps = {
  employeeTask: IEmployeeTask;
};

const Comments = ({ employeeTask }: CommentProps) => {
  const { data: comments, mutate } = useSWR<IComment[]>(`/api/employeeTasks/${employeeTask.id}/comments`, fetcher);
  const [addComment, setAddComment] = useState(false);
  const { control, handleSubmit, reset } = useForm();
  const scrollRef = useRef(null);
  const user = useSession();
  const [mentions, setMentions] = useState<{ id: number; display: string; email: string }[]>([]);

  const updateMentions = (id: number, display: string, email: string) => {
    setMentions((m) => [...m, { id: id, display: display, email: email }]);
  };

  const onSubmit = handleSubmit(async (formData) => {
    const newComment = await axios.post(`/api/employeeTasks/${employeeTask.id}/comments`, {
      text: formData.comment,
    });
    mutate([...comments, newComment.data]);
    const trueMentions = mentions.filter((mention) => formData.comment.includes(mention.display));
    const uniqueMentions = uniqBy(trueMentions, 'id');
    const taskURL = `${process.env.NEXT_PUBLIC_TRAK_URL}/oppgave/${employeeTask.id}`;
    uniqueMentions.forEach((mention) => {
      axios.post('/api/notification', {
        description: `Du er nevnt i "[${employeeTask.task.title}](${taskURL})"`,
        slack_description: `Du er nevnt i "<${taskURL}|${employeeTask.task.title}>" av ${user.data.user.name}`,
        employee_id: mention.id,
        email: mention.email,
        created_by: user.data.user,
      });
    });

    setAddComment(false);
    reset();
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  });
  return (
    <>
      <Box maxHeight={'300px'} sx={{ overflowY: 'auto', overflowX: 'auto' }}>
        {comments?.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
        <div ref={scrollRef} />
      </Box>
      {!addComment && <AddButton onClick={() => setAddComment(true)} text='Legg til kommentar' />}
      {addComment && (
        <CommentEditor
          cancel={setAddComment}
          cancelText='Avbryt'
          confirmText='Publiser'
          control={control}
          onSubmit={onSubmit}
          updateMentions={updateMentions}
        />
      )}
    </>
  );
};
export default Comments;
