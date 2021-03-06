import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Avatar from 'components/Avatar';
import CommentEditor from 'components/form/CommentEditor';
import { format } from 'date-fns';
import uniqBy from 'lodash/uniqBy';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { useSWRConfig } from 'swr';
import { IComment } from 'utils/types';

type CommentCardProps = {
  comment: IComment;
} & StackProps;

const CommentCard = ({ comment, ...args }: CommentCardProps) => {
  const user = useSession();
  const [displayEditComment, setDisplayEditComment] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { control, handleSubmit } = useForm({ defaultValues: { comment: comment.text } });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { mutate } = useSWRConfig();

  const [mentions, setMentions] = useState<{ id: number; display: string; email: string }[]>([]);

  const updateMentions = (id, display, email) => {
    setMentions((m) => [...m, { id: id, display: display, email: email }]);
  };

  const onSubmit = handleSubmit(async (formData) => {
    await axios.put(`/api/employeeTasks/${comment.employee_task_id}/comments/${comment.id}`, {
      data: { ...comment, text: formData.comment },
    });
    mutate(`/api/employeeTasks/${comment.employee_task_id}/comments`);
    const trueMentions = mentions.filter((mention) => formData.comment.includes(mention.display));
    const uniqueMentions = uniqBy(trueMentions, 'id');
    const taskURL = `${process.env.NEXT_PUBLIC_TRAK_URL}/oppgave/${comment.employee_task_id}`;
    uniqueMentions.forEach((mention) => {
      axios.post('/api/notification', {
        description: `Du er nevnt i "[${comment.employee_task.task.title}](${taskURL})"`,
        slack_description: `Du er nevnt i "<${taskURL}|${comment.employee_task.task.title}>" av ${user.data.user.name}`,
        employee_id: mention.id,
        email: mention.email,
        created_by: user.data.user,
      });
    });
    setDisplayEditComment(false);
    handleClose();
  });

  const deleteComment = async () => {
    await axios.delete(`/api/employeeTasks/${comment.employee_task_id}/comments/${comment.id}`);

    mutate(`/api/employeeTasks/${comment.employee_task_id}/comments`);
  };
  const editComment = () => {
    setDisplayEditComment(true);
  };
  return displayEditComment ? (
    <CommentEditor
      cancel={setDisplayEditComment}
      cancelText={'Avbryt'}
      confirmText={'Endre'}
      control={control}
      onSubmit={onSubmit}
      updateMentions={updateMentions}
    />
  ) : (
    <Stack flexDirection={'row'} gap='16px' sx={{ marginBottom: 1 }} {...args}>
      <Avatar firstName={comment.created_by.first_name} image={comment.created_by.image_url} lastName={comment.created_by.last_name} />
      <Stack spacing={1} sx={{ width: '100%' }}>
        <Stack direction='row' justifyContent={'space-between'}>
          <Typography color='primary.main' variant='body2'>
            {comment.created_by.first_name}
          </Typography>
          <Typography color='primary.main' variant='body2'>
            {format(new Date(comment.created_at), 'dd.MM.yyyy')}
          </Typography>
        </Stack>
        <ReactMarkdown>{comment.text}</ReactMarkdown>
      </Stack>
      {parseInt(user.data.user.id) === comment.created_by_id && (
        <>
          <IconButton color='inherit' onClick={handleClick} sx={{ padding: '4px', width: 'fit-content', height: 'fit-content' }}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorEl={anchorEl}
            id='basic-menu'
            onClose={handleClose}
            open={open}
          >
            <MenuItem onClick={editComment}>
              <ListItemIcon>
                <EditIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary='Rediger' />
            </MenuItem>
            <MenuItem onClick={deleteComment}>
              <ListItemIcon>
                <DeleteIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary='Slett' />
            </MenuItem>
          </Menu>
        </>
      )}
    </Stack>
  );
};

export default CommentCard;
