import ContextProvider from 'ContextProvider';
import type { AppProps } from 'next/app';
import Error from 'next/error';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  }
  return (
    <ContextProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
