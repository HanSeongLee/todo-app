import React, { ButtonHTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    checked?: boolean;
}

const CheckBox: React.FC<IProps> = ({ checked, className, ...props }) => {
    return (
        <button className={cn(styles.checkBox, {
            [styles.checked]: checked,
        }, className)}
                type={'button'}
                {...props}
        />
    );
};

CheckBox.defaultProps = {
    checked: false,
};

export default CheckBox;
