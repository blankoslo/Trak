import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Theme } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

type SearchFieldProps = {
  placeholder: string;
} & TextFieldProps;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.primary,
    borderColor: `${theme.palette.primary.main} !important`,
  },
  icon: {
    color: theme.palette.text.primary,
  },
}));
const SearchField = ({ placeholder, ...args }: SearchFieldProps) => {
  const classes = useStyles();
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon className={classes.icon} />
          </InputAdornment>
        ),
      }}
      className={classes.root}
      placeholder={placeholder}
      size='small'
      sx={{ padding: 0 }}
      {...args}
    />
  );
};

export default SearchField;
