import { makeStyles, Typography, TypographyProps } from '@material-ui/core';
import theme from 'theme';

type TypoProps = {
  variant?: 'h1' | 'h2' | 'body1' | 'body2';
  disabled?: boolean;
} & TypographyProps;

const useStyles = makeStyles({
  disabled: {
    color: theme.palette.text.disabled,
  },
});

const Typo = ({ color = 'textPrimary', variant = 'body1', disabled = false, children, ...args }: TypoProps) => {
  const classes = useStyles();

  return (
    <Typography className={disabled ? classes.disabled : undefined} color={color} {...args} variant={variant}>
      {children}
    </Typography>
  );
};

export default Typo;
