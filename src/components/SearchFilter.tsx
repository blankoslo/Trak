import { Button, makeStyles } from '@material-ui/core';
import { Search, Tune } from '@material-ui/icons';

const useStyles = makeStyles({
  centeringRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

const SearchFilter = () => {
  const classes = useStyles();
  return (
    <div className={classes.centeringRow}>
      <div>
        <Button aria-label='Søk' color='primary' startIcon={<Search />}>
          Søk
        </Button>
      </div>
      <div>
        <Button aria-label='Filter' color='primary' startIcon={<Tune />}>
          Filter
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;
