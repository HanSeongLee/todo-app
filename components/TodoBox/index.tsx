import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import CrossIcon from '/public/icons/icon-cross.svg';
import CheckBox from 'components/CheckBox';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    todo: Todo;
    onCheck: (id: number) => void;
    onRemove: (id: number) => void;
}

const TodoBox: React.FC<IProps> = ({ todo, onCheck, onRemove, className, ...props }) => {
    const { id, text, completed } = todo;

    return (
        <div className={cn(styles.todoBox, {
            [styles.completed]: completed,
        }, className)}
             {...props}
        >
            <CheckBox checked={completed}
                      onClick={_ => onCheck(id)}
            />
            <div className={styles.contents}>
                {text}
            </div>
            <button className={styles.button}
                    type={'button'}
                    arial-label={'Remove'}
                    onClick={_ => onRemove(id)}
            >
                <CrossIcon />
            </button>
        </div>
    );
};

export default TodoBox;
