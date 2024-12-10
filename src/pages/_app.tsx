import React from 'react';
import { AppProps } from 'next/app';
import { JwtProvider } from '../context/jwt';

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <JwtProvider>
      <Component {...pageProps} />
    </JwtProvider>

  );
}
