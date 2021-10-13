import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Typo from 'components/Typo';
import Image from 'next/image';
import theme from 'theme';

const useStyles = makeStyles({
  root: {
    transform: 'translate(-50%,-50%)',
    left: '50%',
    position: 'absolute',
    top: '50%',
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
});

/**
 * Loading page to be used once fetching data
 * @returns LoadingLogo
 */
const LoadingLogo = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Image className={classes.animateLogo} height={80} priority src='/trak_logo.svg' width={240} />
      <Typo>Henter data...</Typo>
    </Box>
  );
};

export default LoadingLogo;
