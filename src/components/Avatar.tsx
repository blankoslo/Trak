import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

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
