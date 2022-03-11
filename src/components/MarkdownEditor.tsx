import 'react-markdown-editor-lite/lib/index.css';

import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Markdown from 'components/Markdown';
import dynamic from 'next/dynamic';
import { Controller } from 'react-hook-form';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& *': {
      background: `${theme.palette.background.default} !important`,
      color: `${theme.palette.text.primary} !important`,
    },
  },
}));
type MarkdownEditorProps = {
  name: string;
  // eslint-disable-next-line
  control: any;
};

const MarkdownEditor = ({ name, control }: MarkdownEditorProps) => {
  const classes = useStyles();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, name } }) => {
        return (
          <MdEditor
            canView={{ menu: true, md: false, html: true, fullScreen: false, hideMenu: true }}
            className={classes.root}
            name={name}
            onChange={onChange}
            renderHTML={(text) => <Markdown text={text} />}
            style={{ height: '200px' }}
            value={value?.text || value}
            view={{ menu: true, md: true, html: false }}
          />
        );
      }}
    />
  );
};
export default MarkdownEditor;
