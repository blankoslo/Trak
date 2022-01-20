import Add from '@mui/icons-material/Add';
import Button, { ButtonProps } from '@mui/material/Button';
export type AddButtonProps = {
  text: string;
  onClick: () => void;
} & ButtonProps;
const AddButton = ({ onClick, text, ...args }: AddButtonProps) => {
  return (
    <Button onClick={onClick} {...args} startIcon={<Add />}>
      {text}
    </Button>
  );
};

export default AddButton;
