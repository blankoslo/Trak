import { createTheme } from '@mui/material/styles';
import { ColorMode } from 'utils/types';
// Create a theme instance.

const typography = {
  h1: {
    fontSize: '3rem',
  },
  h2: {
    fontSize: '2rem',
  },
  h3: {
    fontSize: '1.5rem',
  },
  h4: {
    fontSize: '1.125rem',
  },
  h5: {
    fontSize: '1rem',
  },
  subtitle1: {
    fontSize: '1.125rem',
  },
  body1: {
    fontSize: '1rem',
  },
  body2: {
    fontSize: '0.875rem',
  },
};

export const getTheme = (mode: string) => {
  let theme;
  switch (mode) {
    case ColorMode.DARK:
      theme = createTheme({
        palette: {
          primary: {
            main: '#FFFCB6',
            light: '#FFF7ED',
          },
          secondary: {
            main: '#A5C',
            light: '#A5C8D1',
          },
          error: {
            main: '#FF6060',
            dark: '#BF4040',
          },
          success: {
            main: '#60FFAB',
          },
          background: {
            default: '#272D2A',
            paper: '#454B48',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#272D2A',
            disabled: '#FFF',
          },
        },
        typography: typography,
      });
      break;
    default:
      theme = createTheme({
        palette: {
          primary: {
            main: '#1A0628',
            light: '#DDC3F3',
          },
          secondary: {
            main: '#144c96',
            light: '#A5C8D1',
          },
          error: {
            main: '#C11515',
            dark: '#BF4040',
          },
          success: {
            main: '#50C878',
          },
          background: {
            default: '#FFFFFF',
            paper: '#EADEF4',
          },
          text: {
            primary: '#2F2F2F',
            secondary: '#F2F2F2',
            disabled: '#4B4949',
          },
        },
        typography: typography,
      });
  }
  theme.components = {
    ...theme.components,
    MuiDialog: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: 16,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.disabled,
          top: '-15px !important',
          marginLeft: 6,
          '&$focused': {
            marginLeft: 0,
            color: theme.palette.secondary.main,
          },
        },
        shrink: {
          marginLeft: 0,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        formControl: {
          'label + &': {
            marginTop: 0,
          },
        },
        root: {},
        underline: {
          '&:after': {
            borderBottom: `2px solid ${theme.palette.secondary.main}`,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          marginLeft: 6,
          marginRight: 6,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.default,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        noOptions: {
          color: theme.palette.text.primary,
        },
        tag: {
          backgroundColor: theme.palette.background.paper,
        },
        paper: {
          backgroundColor: theme.palette.background.default,
          border: `0.6px solid ${theme.palette.primary.main} `,
          fontSize: '1rem',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          minWidth: '32px',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '1rem',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          paddingTop: theme.spacing(0.5),
          paddingBottom: theme.spacing(0.5),
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          padding: theme.spacing(1),
          marginRight: theme.spacing(1),
          '&:hover': {
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.primary.light,
          },
          '&.Mui-selected': {
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.primary.main,
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: {
          '&:not(:last-of-type)': {
            borderRadius: theme.spacing(3),
          },
          '&:last-of-type': {
            borderRadius: theme.spacing(3),
          },
        },
      },
    },
  };
  return theme;
};
