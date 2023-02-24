import React, { HTMLAttributes, ReactNode } from 'react';
import styles from './style.module.scss';
import TodoBox from 'components/TodoBox';
import cn from 'classnames';
import Button from 'components/Button';
import dynamic from 'next/dynamic';
import { DragDropContextProps, DraggableProps, DroppableProps, DropResult } from 'react-beautiful-dnd';

const DragDropContext = dynamic<DragDropContextProps>(
    () =>
        import('react-beautiful-dnd').then(mod => {
            return mod.DragDropContext;
        }) as any,
    {ssr: false},
);
const Droppable = dynamic<DroppableProps>(
    () =>
        import('react-beautiful-dnd').then(mod => {
            return mod.Droppable;
        }) as any,
    {ssr: false},
);

const Draggable = dynamic<DraggableProps>(
    () =>
        import('react-beautiful-dnd').then(mod => {
            return mod.Draggable;
        }) as any,
    {ssr: false},
);

interface IProps extends HTMLAttributes<HTMLDivElement>, TodoList {
    footer?: ReactNode;
}

const TodoList: React.FC<IProps> = ({
                                        todos, onCheck, onRemove, onClear,
                                        onCompleted, onReorder, footer
                                    }) => {
    const activeItemCount = todos.filter(({ completed }) => !completed).length;

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return ;
        }

        onReorder(result.source.index, result.destination.index);
    };

    return (
        <div className={cn(styles.todoList)}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'todo-container'}>
                    {(provided) => (
                        <div className={styles.todoBoxContainer}
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                        >
                            {todos.map((todo, index) => (
                                <Draggable key={`${todo.id}`}
                                           draggableId={`${todo.id}`}
                                           index={index}
                                >
                                    {(provided) => (
                                        <li className={cn(styles.todoBoxItem)}
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                        >
                                            <TodoBox todo={todo}
                                                     onCheck={onCheck}
                                                     onRemove={onRemove}
                                            />
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <div className={styles.footer}>
                <span className={styles.activeItemCount}>
                    {activeItemCount === 0 ? 'No' : activeItemCount} {activeItemCount === 1 ? 'item' : 'items'} left
                </span>

                {footer && (
                    <div>
                        {footer}
                    </div>
                )}

                <div className={styles.buttonContainer}>
                    <Button onClick={onClear}>
                        Clear
                    </Button>
                    <Button onClick={onCompleted}>
                        Completed
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
