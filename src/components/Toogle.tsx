import { ButtonBase, Stack, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '40px',
    padding: theme.spacing(0.5),
    width: 'fit-content',
    fontSize: '12px',
  },
  option: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(0.5),
    backgroundColor: 'transparent',
    borderRadius: '40px',
    padding: theme.spacing(1),
  },
  selectedOption: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(0.5),
    backgroundColor: theme.palette.background.default,
    borderRadius: '40px',
    padding: theme.spacing(1),
  },
}));

type OptionProps = {
  isSelected: boolean;
  name: string;
  onClick: () => void;
};

const Option = ({ isSelected, name, onClick }: OptionProps) => {
  const classes = useStyles();
  return (
    <ButtonBase className={isSelected ? classes.selectedOption : classes.option} disabled={isSelected} onClick={onClick}>
      {name}
    </ButtonBase>
  );
};

type ToogleProps = {
  options: string[];
  func: () => void;
  defaultChecked?: number;
};

const Toogle = ({ options, func, defaultChecked = 0 }: ToogleProps) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState(defaultChecked);

  const toogle = (index: number) => {
    setSelectedOption(index);
    func();
  };
  return (
    <Stack className={classes.root} direction='row'>
      {options.map((option: string, index: number) => (
        <Option isSelected={selectedOption === index} key={index} name={option} onClick={() => toogle(index)} />
      ))}
    </Stack>
  );
};

export default Toogle;
