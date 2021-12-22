import { CssBaseline } from '@mui/material';
import Layout from 'components/Layout';
import { ColorModeProvider } from 'context/ColorMode';
import { ProgressbarProvider } from 'context/Progressbar';
import { SnackbarProvider } from 'context/Snackbar';
import ThemeProvider from 'context/ThemeProvider';
import { UserProvider } from 'context/User';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
const ContextProvider = ({ children, pageProps }) => {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ColorModeProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <ProgressbarProvider>
                <UserProvider>
                  <CssBaseline />
                  <Layout>{children}</Layout>
                </UserProvider>
              </ProgressbarProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </ColorModeProvider>
      </SessionProvider>
    </>
  );
};

export default ContextProvider;
