import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
export type AddButtonProps = {
  text: string;
  onClick: () => void;
};
const AddButton = ({ onClick, text }: AddButtonProps) => {
  return (
    <Button onClick={onClick} startIcon={<Add />}>
      {text}
    </Button>
  );
};

export default AddButton;
