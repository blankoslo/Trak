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

  const setColor = (colorMode: ColorMode) => {
    setMode(colorMode);
    setItem('colorMode', colorMode);
  };

  const toogleColorMode = () => {
    if (mode === ColorMode.DARK) {
      setColor(ColorMode.LIGHT);
    } else {
      setColor(ColorMode.DARK);
    }
  };
  const [mode, setMode] = useState(ColorMode.LIGHT);

  useEffect(() => {
    const userSelectedColorMode = colorModeFromLocalStorage === ColorMode.DARK ? ColorMode.DARK : ColorMode.LIGHT;
    const systemColorMode = prefersDarkMode ? ColorMode.DARK : ColorMode.LIGHT;
    const colorMode = colorModeFromLocalStorage ? userSelectedColorMode : systemColorMode;
    setMode(colorMode);
  }, [prefersDarkMode, colorModeFromLocalStorage]);

  return <ColorModeContext.Provider value={{ mode: mode, setMode: setMode, toggleColorMode: toogleColorMode }} {...props} />;
}

export { useColorMode, ColorModeProvider };
