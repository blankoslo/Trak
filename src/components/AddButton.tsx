import { Add } from '@mui/icons-material/';
import { Button } from '@mui/material';

/**
 * @typedef {object} AddButtonProps
 * @property {string} text Text to be displayed on the button
 * @property {function} onClick Function to be executed once the button is clicked
 */
export type AddButtonProps = {
  text: string;
  onClick: () => void;
};

/**
 * Button to be used when adding new things
 * @param {AddButtonProps} params
 * @returns AddButton
 */
const AddButton = ({ onClick, text }: AddButtonProps) => {
  return (
    <Button onClick={onClick} startIcon={<Add />}>
      {text}
    </Button>
  );
};

export default AddButton;
