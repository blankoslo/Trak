import { Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

export type PageTitleProps = {
  title: string;
  subtitle?: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    lineHeight: 0.7,
  },
  gutterBottom: {
    marginBottom: theme.spacing(2),
  },
}));
const PageTitle = ({ title, subtitle }: PageTitleProps) => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classNames(classes.title, classes.gutterBottom)} variant='h1'>
        {title}
      </Typography>
      <Typography variant='h2'>{subtitle}</Typography>
    </div>
  );
};

export default PageTitle;
