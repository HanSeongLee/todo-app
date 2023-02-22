import React, { useEffect, useState } from 'react';

export enum ActionType {
    ADD_TODO,
    REMOVE_TODO,
    UPDATE_TODO,
    UPDATE_TODO_LIST,
    CLEAR_TODO,
}

const initialTodoList: Todo[] = [
    {
        id: 1,
        completed: true,
        text: 'Complete online JavaScript course',
    },
    {
        id: 2,
        completed: false,
        text: 'Jog around the park 3x',
    },
    {
        id: 3,
        completed: false,
        text: '10 minutes meditation',
    },
    {
        id: 4,
        completed: false,
        text: 'Read for 1 hour',
    },
    {
        id: 5,
        completed: false,
        text: 'Pick up groceries',
    },
    {
        id: 6,
        completed: false,
        text: 'Complete Todo App on Frontend Mentor',
    },
];

const initialValue = {
    todos: initialTodoList,
    dispatch: (actionType: ActionType, payload: unknown) => {},
};

export const TodoContextWrapper: React.FC = ({ children }) => {
    const [value, setValue] = useState(initialValue);

    const dispatch = (actionType: ActionType, payload: unknown) => {
        switch (actionType) {
            case ActionType.ADD_TODO: {
                const { text, completed } = payload as any;
                const newTodos = [
                    ...value.todos,
                    {
                        id: value.todos.length + 1,
                        text,
                        completed,
                    },
                ];
                setValue({
                    ...value,
                    todos: newTodos,
                });
                window.localStorage.setItem('todos', JSON.stringify(newTodos));
                return;
            }
            case ActionType.REMOVE_TODO: {
                const { id } = payload as any;
                const newTodos = value.todos.filter(({ id: _id }) => _id !== id);
                setValue({
                    ...value,
                    todos: newTodos,
                });
                window.localStorage.setItem('todos', JSON.stringify(newTodos));
                return;
            }
            case ActionType.UPDATE_TODO: {
                const { id, text, completed } = payload as any;
                const newTodos = value.todos.map((todo) => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            text: text ? text : todo.text,
                            completed: completed !== undefined ? completed : todo.completed,
                        };
                    }
                    return todo;
                });
                setValue({
                    ...value,
                    todos: newTodos,
                });
                window.localStorage.setItem('todos', JSON.stringify(newTodos));
                return;
            }
            case ActionType.UPDATE_TODO_LIST: {
                const { todos } = payload as any;
                setValue({
                    ...value,
                    todos: todos,
                });
                window.localStorage.setItem('todos', JSON.stringify(todos));
                return;
            }
            case ActionType.CLEAR_TODO: {
                setValue({
                    ...value,
                    todos: [],
                });
                window.localStorage.setItem('todos', JSON.stringify([]));
                return;
            }
            default:
                return;
        }
    };

    useEffect(() => {
        const localTodosData = window.localStorage.getItem('todos');
        if (!localTodosData) {
            return ;
        }
        const localTodos = JSON.parse(localTodosData);
        dispatch(ActionType.UPDATE_TODO_LIST, {
            todos: localTodos,
        });
    }, []);

    return (
        <TodoContext.Provider value={{
            ...value,
            dispatch,
        }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const TodoContext = React.createContext(initialValue);
