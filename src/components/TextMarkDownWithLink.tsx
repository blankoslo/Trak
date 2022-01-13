import Typography, { TypographyProps } from '@mui/material/Typography';
import Linkify from 'react-linkify';
import ReactMarkdown from 'react-markdown';

export type TextMarkDownWithLinkProps = TypographyProps & {
  text: string;
};

const TextMarkDownWithLink = ({ variant = 'body1', text, ...args }: TextMarkDownWithLinkProps) => {
  return (
    <Typography variant={variant} {...args}>
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <a href={decoratedHref} key={key} rel='noreferrer' target='_blank'>
            {decoratedText}
          </a>
        )}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </Linkify>
    </Typography>
  );
};

export default TextMarkDownWithLink;
