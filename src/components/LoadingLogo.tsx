import { Box, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  animateLogo: {
    animation: `$pulse 1500ms ${theme.transitions.easing.easeIn} infinite`,
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.9)',
    },
    '50%': {
      transform: 'scale(1)',
    },
    '100%': {
      transform: 'scale(0.9)',
    },
  },
}));

const LoadingLogo = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Image className={classes.animateLogo} height={80} priority src='/trak_logo.svg' width={240} />
      <Typography>Henter data...</Typography>
    </Box>
  );
};

LoadingLogo.displayName = 'LoadingLogo';

export default LoadingLogo;
