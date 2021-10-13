import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import Typo from 'components/Typo';
import { useData } from 'context/Data';
import theme from 'theme';
import { IProfession } from 'utils/types';

const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: theme.spacing(2),
  },
  wrap: {
    flexWrap: 'wrap',
  },
  selectedButton: {
    '&.MuiToggleButton-root': {
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      color: theme.palette.secondary.main,
    },
  },
});

/**
 * @typedef {object} FilterProps
 * @property {string[]} choosenProfession
 * @property {function} setChoosenProfession
 */
export type FilterProps = {
  choosenProfession: string[];
  setChoosenProfession: (element: string[]) => void;
};

/**
 * Filter employees based on their profession
 * @param {FilterProps} params
 * @returns Filter
 */
const Filter = ({ choosenProfession, setChoosenProfession }: FilterProps) => {
  const classes = useStyles();
  const { professions } = useData();

  const handleFormat = (_, newFormats) => {
    if (newFormats.length === professions.length) {
      setChoosenProfession([]);
    } else {
      setChoosenProfession(newFormats);
    }
  };

  const clearFilters = () => {
    setChoosenProfession([]);
  };
  return (
    <Box display='flex' flexDirection='column' maxWidth='400px' minWidth='300px' padding={2}>
      <Typo gutterBottom variant='h2'>
        Rolle
      </Typo>
      <ToggleButtonGroup className={classNames(classes.wrap, classes.gutterBottom)} onChange={handleFormat} value={choosenProfession}>
        {professions?.map((profession: IProfession) => {
          return (
            <ToggleButton className={classes.selectedButton} key={profession.id} value={profession.title}>
              {profession.title}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>

      <Button color='primary' disabled={!choosenProfession.length} onClick={clearFilters} variant='outlined'>
        Tøm filtre
      </Button>
    </Box>
  );
};

export default Filter;
