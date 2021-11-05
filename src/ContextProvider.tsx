import { CssBaseline } from '@mui/material';
import Layout from 'components/Layout';
import { ColorModeProvider } from 'context/ColorMode';
import { DataProvider } from 'context/Data';
import { ProgressbarProvider } from 'context/Progressbar';
import { SnackbarProvider } from 'context/Snackbar';
import ThemeProvider from 'context/ThemeProvider';
import { UserProvider } from 'context/User';
import { Provider } from 'next-auth/client';
import React from 'react';
const ContextProvider = ({ children, pageProps }) => {
  // const prefersDarkMode

  // createTheme based on ^^^^

  // That theme needs to be updated in theme.ts
  return (
    <>
      <Provider session={pageProps.session}>
        <ColorModeProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <ProgressbarProvider>
                <UserProvider>
                  <DataProvider>
                    <CssBaseline />
                    <Layout>{children}</Layout>
                  </DataProvider>
                </UserProvider>
              </ProgressbarProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </ColorModeProvider>
      </Provider>
    </>
  );
};

export default ContextProvider;
