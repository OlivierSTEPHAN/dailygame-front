import { StrictMode } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
  return <StrictMode>
      <Component {...pageProps} />
      <Analytics />
    </StrictMode>;
}

export default MyApp;
