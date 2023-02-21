import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLUListElement> {
    items: string[];
    activeIndex: number;
    onChangeTab: (index: number) => void;
}

const Tabs: React.FC<IProps> = ({
                                    items, activeIndex, onChangeTab, className,
                                    ...props
                                }) => {
    return (
        <ul className={cn(styles.tabs, className)}
            {...props}
        >
            {items.map((item, index) => (
                <li className={cn(styles.item, {
                    [styles.active]: index === activeIndex,
                })}
                    key={index}
                    onClick={_ => onChangeTab(index)}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
};

export default Tabs;
