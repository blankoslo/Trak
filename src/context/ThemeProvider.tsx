import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createContext, ReactNode } from 'react';
import { getTheme } from 'theme';

import { useColorMode } from './ColorMode';

const ThemeContext = createContext(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { mode } = useColorMode();

  return (
    <ThemeContext.Provider value={mode}>
      <MuiThemeProvider theme={getTheme(mode)}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
