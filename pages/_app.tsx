import { StrictMode } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <StrictMode><Component {...pageProps} /></StrictMode>;
}

export default MyApp;
