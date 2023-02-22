import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import TodoList from 'components/TodoList';
import cn from 'classnames';
import Tabs from 'components/Tabs';
import { TabList } from 'types/tab';

interface IProps extends HTMLAttributes<HTMLDivElement>, TodoList, TabList {

}

const TodoTabList: React.FC<IProps> = ({
                                           todos, onCheck, onRemove, onClear,
                                           onCompleted, onReorder, tabs, activeTabIndex,
                                           onChangeTab, className, ...props
                                       }) => {
    return (
        <div className={cn(styles.todoTabList, className)}
             {...props}
        >
            <TodoList todos={todos}
                      onCheck={onCheck}
                      onRemove={onRemove}
                      onClear={onClear}
                      onCompleted={onCompleted}
                      onReorder={onReorder}
            />

            <Tabs items={tabs}
                  activeIndex={activeTabIndex}
                  onChangeTab={onChangeTab}
            />
        </div>
    );
};

export default TodoTabList;
