import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@material-ui/core';
type AvatarProps = {
  firstName: string;
  lastName: string;
  image?: string;
} & MuiAvatarProps;

const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}.${lastName.charAt(0)}`;
};

const Avatar = ({ firstName, lastName, image, ...args }: AvatarProps) => {
  return (
    <MuiAvatar src={image} {...args}>
      {getInitials(firstName, lastName)}
    </MuiAvatar>
  );
};

export default Avatar;
