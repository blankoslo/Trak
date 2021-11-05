import { useMediaQuery } from '@mui/material';
import useStorage from 'hooks/useStorage';
import { createContext, useContext, useEffect, useState } from 'react';
import { ColorMode } from 'utils/types';
const ColorModeContext = createContext(undefined);

function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error(`useColorMode must be used within a ColorModeProvider`);
  }
  return context;
}

function ColorModeProvider(props) {
  const { getItem, setItem } = useStorage();

  const colorModeFromLocalStorage = getItem('colorMode');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const toogleColorMode = () => {
    if (mode === ColorMode.DARK) {
      setMode(ColorMode.LIGHT);
      setItem('colorMode', ColorMode.LIGHT);
    } else {
      setMode(ColorMode.DARK);
      setItem('colorMode', ColorMode.DARK);
    }
  };
  const [mode, setMode] = useState(ColorMode.LIGHT);

  useEffect(() => {
    setMode(
      colorModeFromLocalStorage
        ? colorModeFromLocalStorage === ColorMode.DARK
          ? ColorMode.DARK
          : ColorMode.LIGHT
        : prefersDarkMode
        ? ColorMode.DARK
        : ColorMode.LIGHT,
    );
  }, [prefersDarkMode, colorModeFromLocalStorage]);

  return <ColorModeContext.Provider value={{ mode: mode, setMode: setMode, toggleColorMode: toogleColorMode }} {...props} />;
}

export { useColorMode, ColorModeProvider };
