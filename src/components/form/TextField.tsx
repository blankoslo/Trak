import MuiTextField, { StandardTextFieldProps as MUITextFieldProps } from '@mui/material/TextField';
import { RegisterOptions } from 'react-hook-form';
export type TextFieldProps = MUITextFieldProps &
  // eslint-disable-next-line
  Pick<any, 'register' | 'errors'> & {
    rules?: RegisterOptions;
    name: string;
  };
const TextField = ({ register, name, errors = {}, rules = {}, ...args }: TextFieldProps) => {
  return (
    <MuiTextField
      InputLabelProps={{ shrink: true }}
      error={Boolean(errors[name])}
      fullWidth
      helperText={errors[name]?.message}
      {...register(name, rules)}
      label={args.label || 'Skriv her'}
      name={name}
      variant='standard'
      {...args}
    />
  );
};

export default TextField;
