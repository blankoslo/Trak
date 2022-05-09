import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    '& a': {
      color: theme.palette.text.primary,
    },
  },
}));
type MarkdownProps = {
  text: string;
};

const Markdown = ({ text }: MarkdownProps) => {
  const classes = useStyles();
  return <ReactMarkdown className={classes.link}>{text}</ReactMarkdown>;
};

export default Markdown;
