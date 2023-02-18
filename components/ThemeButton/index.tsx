import React, { ButtonHTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { Theme } from 'types/theme';
import MoonIcon from 'public/icons/icon-moon.svg';
import SunIcon from 'public/icons/icon-sun.svg';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme: Theme;
}

const ThemeButton: React.FC<IProps> = ({ theme, className, ...props }) => {
    return (
        <button className={cn(styles.themeButton, className)}
                arial-label={theme === Theme.LIGHT ? 'Dark Theme' : 'Light Theme'}
                {...props}
        >
            {theme === Theme.LIGHT && (<MoonIcon />)}
            {theme === Theme.DARK && (<SunIcon />)}
        </button>
    );
};

export default ThemeButton;
