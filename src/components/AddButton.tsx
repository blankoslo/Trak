import { Add } from '@mui/icons-material/';
import { Button } from '@mui/material';
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
