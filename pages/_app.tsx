import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ThemeContextWrapper } from 'lib/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThemeContextWrapper>
        <Component {...pageProps} />
      </ThemeContextWrapper>
  );
}

export default MyApp
