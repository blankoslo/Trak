import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid, { GridProps } from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Avatar from 'components/Avatar';
import CommentEditor from 'components/form/CommentEditor';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { useSWRConfig } from 'swr';
import { IComment } from 'utils/types';

type CommentCardProps = {
  comment: IComment;
} & GridProps;

const CommentCard = ({ comment, ...args }: CommentCardProps) => {
  const user = useSession();
  const [displayEditComment, setDisplayEditComment] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { comment: comment.text } });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { mutate } = useSWRConfig();

  const onSubmit = handleSubmit(async (formData) => {
    await axios.put(`/api/employeeTasks/${comment.employeeTaskId}/comments/${comment.id}`, {
      data: { ...comment, text: formData.comment },
    });
    mutate(`/api/employeeTasks/${comment.employeeTaskId}/comments`);
    setDisplayEditComment(false);
    handleClose();
  });

  const deleteComment = async () => {
    await axios.delete(`/api/employeeTasks/${comment.employeeTaskId}/comments/${comment.id}`);

    mutate(`/api/employeeTasks/${comment.employeeTaskId}/comments`);
  };

  const editComment = () => {
    setDisplayEditComment(true);
  };
  return displayEditComment ? (
    <CommentEditor cancel={setDisplayEditComment} cancelText={'Avbryt'} confirmText={'Endre'} errors={errors} onSubmit={onSubmit} register={register} />
  ) : (
    <Grid container marginBottom={2} spacing={2} {...args}>
      <Grid item sm={1} xs={2}>
        <Avatar firstName={comment.createdByEmployee.firstName} image={comment.createdByEmployee.imageUrl} lastName={comment.createdByEmployee.lastName} />
      </Grid>
      <Grid item sm={10} xs={9}>
        <Stack spacing={1} sx={{ width: '100%' }}>
          <Stack direction='row' justifyContent={'space-between'}>
            <Typography color='primary.main' variant='body2'>
              {comment.createdByEmployee.firstName}
            </Typography>
            <Typography color='primary.main' variant='body2'>
              {format(new Date(comment.createdAt), 'dd.MM.yyyy')}
            </Typography>
          </Stack>
          <ReactMarkdown>{comment.text}</ReactMarkdown>
        </Stack>
      </Grid>
      <Grid item xs={1}>
        {parseInt(user.data.user.id) === comment.createdById && (
          <>
            <IconButton color='inherit' onClick={handleClick} sx={{ padding: 0 }}>
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
      </Grid>
    </Grid>
  );
};

export default CommentCard;
