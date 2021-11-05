import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useColorMode } from 'context/ColorMode';
import { createContext, ReactNode } from 'react';
import { getTheme } from 'theme';

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
