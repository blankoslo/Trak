import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps, Typography } from '@mui/material';

export type AvatarProps = {
  firstName: string;
  lastName: string;
  image?: string;
} & MuiAvatarProps;

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}.${lastName.charAt(0)}`;
};

const Avatar = ({ firstName, lastName, image, ...args }: AvatarProps) => {
  return (
    <MuiAvatar alt={`Profilbilde av ${firstName} ${lastName}`} src={image} {...args}>
      <Typography>{getInitials(firstName, lastName)}</Typography>
    </MuiAvatar>
  );
};

export default Avatar;
