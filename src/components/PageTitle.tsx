import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import Typo from 'components/Typo';

/**
 * @typedef {object} PageTitleProps
 * @property {string} title
 * @property {string} subtitle
 */
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

/**
 * Component to be used on every page to make sure all titles are the same
 * @param {PageTitleProps} params
 * @returns PageTitle
 */
const PageTitle = ({ title, subtitle }: PageTitleProps) => {
  const classes = useStyles();
  return (
    <div>
      <Typo className={classNames(classes.title, classes.gutterBottom)} variant='h1'>
        {title}
      </Typo>
      <Typo variant='h2'>{subtitle}</Typo>
    </div>
  );
};

export default PageTitle;
