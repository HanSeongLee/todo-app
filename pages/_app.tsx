import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ThemeContextWrapper } from 'lib/ThemeContext';
import { TodoContextWrapper } from 'lib/TodoContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeContextWrapper>
            <TodoContextWrapper>
                <Component {...pageProps} />
            </TodoContextWrapper>
        </ThemeContextWrapper>
    );
}

export default MyApp
