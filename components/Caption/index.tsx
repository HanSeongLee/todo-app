import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const Caption: React.FC<IProps> = ({ className, children, ...props }) => {
    return (
        <div className={cn(styles.caption, className)}
             {...props}
        >
            {children}
        </div>
    );
};

export default Caption;
