import React, { InputHTMLAttributes, ReactNode } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import CheckBox from 'components/CheckBox';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    leftSide?: ReactNode;
}

const Input: React.FC<IProps> = ({ leftSide, className, ...props }) => {
    return (
        <div className={cn(styles.inputWrapper, {
            [styles.leftSide]: leftSide,
        }, className)}>
            {leftSide}
            <input className={styles.input}
                   {...props}
            />
        </div>
    );
};

export default Input;
