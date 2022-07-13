import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Controller } from 'react-hook-form';
import { Offset } from 'utils/types';

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    marginRight: theme.spacing(1),
  },
}));

export type BeforeToogleProps = {
  // eslint-disable-next-line
  control: any;
  name: string;
};
const BeforeToogle = ({ control, name }: BeforeToogleProps) => {
  return (
    <Controller
      control={control}
      defaultValue={Offset.Before}
      name={name}
      render={({ field: { value, onChange } }) => <SelectComponent setValue={onChange} value={value} />}
    />
  );
};
export type ToggleComponentProps = {
  setValue: (newValue: string) => void;
  value: string;
};
export const SelectComponent = ({ setValue, value }: ToggleComponentProps) => {
  const classes = useStyles();
  return (
    <>
      <InputLabel htmlFor='select-before' style={{ display: 'none' }}>
        Før/etter
      </InputLabel>
      <Select
        className={classes.select}
        inputProps={{ name: 'before-toogle', id: 'select-before', 'aria-label': 'Før/etter' }}
        onChange={() => setValue(value === Offset.Before ? Offset.After : Offset.Before)}
        style={{ height: '36px' }}
        value={value}
      >
        <MenuItem value={Offset.Before}>før</MenuItem>
        <MenuItem value={Offset.After}>etter</MenuItem>
      </Select>
    </>
  );
};

export default BeforeToogle;
