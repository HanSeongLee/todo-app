import React, {
    ChangeEvent,
    HTMLAttributes,
    KeyboardEvent,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import Input from 'components/Input';
import CheckBox from 'components/CheckBox';
import TodoTabList from 'components/TodoTabList';
import { TodoTabs } from 'types/tab';
import Caption from 'components/Caption';
import { ActionType, TodoContext } from 'lib/TodoContext';
import { useRouter } from 'next/router';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const TodoContainer: React.FC<IProps> = (props) => {
    const { todos, dispatch } = useContext(TodoContext);
    const [todoState, setTodoState] = useState<boolean>(false);
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const [todoText, setTodoText] = useState<string>('');
    const router = useRouter();
    const { tab } = router.query;

    const onToggleTodoState = () => {
        setTodoState(!todoState);
    };

    const onCheck = useCallback((id: number) => {
        const todo = todos.find(({ id: _id }) => _id === id);
        if (!todo) {
            return ;
        }

        dispatch(ActionType.UPDATE_TODO, {
            id,
            completed: !todo.completed,
        });
    }, [todos]);

    const onAdd = (completed: boolean, text: string) => {
        if (!text) {
            return ;
        }

        dispatch(ActionType.ADD_TODO, {
            text,
            completed,
        });
    };

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        if (key !== 'Enter') {
            return;
        }

        onAdd(todoState, todoText);
        setTodoText('');
    };

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value);
    };

    const onRemove = (id: number) => {
        dispatch(ActionType.REMOVE_TODO, {
            id
        });
    };

    const onClear = () => {
        dispatch(ActionType.CLEAR_TODO, { });
    };

    const onCompleted = () => {
        const newTodos = todos.map((todo) => {
            return {
                ...todo,
                completed: true,
            };
        });
        dispatch(ActionType.UPDATE_TODO_LIST, {
            todos: newTodos,
        });
    };

    const reorder = (list: object[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    const onReorder = (startIndex: number, endIndex: number) => {
        const originalStartIndex = todos.indexOf(filteredTodos[startIndex]);
        const originalEndIndex = todos.indexOf(filteredTodos[endIndex]);
        const reorderedTodos = reorder(todos, originalStartIndex, originalEndIndex);
        dispatch(ActionType.UPDATE_TODO_LIST, {
            todos: reorderedTodos,
        });
    };

    const onChangeTab = (index: number) => {
        switch (index) {
            case TodoTabs.ACTIVE:
                router.push({
                    query: {
                        tab: TodoTabs[TodoTabs.ACTIVE].toLowerCase(),
                    },
                }, undefined, {
                    shallow: true,
                });
                return;
            case TodoTabs.COMPLETED:
                router.push({
                    query: {
                        tab: TodoTabs[TodoTabs.COMPLETED].toLowerCase(),
                    },
                }, undefined, {
                    shallow: true,
                });
                return;
            default: {
                router.push({
                    query: {},
                }, undefined, {
                    shallow: true,
                });
                return;
            }
        }
    };

    const filteredTodos = useMemo(() => {
        switch (activeTabIndex) {
            case TodoTabs.ACTIVE:
                return todos.filter(({completed}) => !completed);
            case TodoTabs.COMPLETED:
                return todos.filter(({completed}) => completed);
            default:
                return todos;
        }
    }, [todos, activeTabIndex]);

    useEffect(() => {
        if (!tab) {
            setActiveTabIndex(TodoTabs.ALL);
            return ;
        }
        switch (tab) {
            case TodoTabs[TodoTabs.ACTIVE].toLowerCase():
                setActiveTabIndex(TodoTabs.ACTIVE);
                return;
            case TodoTabs[TodoTabs.COMPLETED].toLowerCase():
                setActiveTabIndex(TodoTabs.COMPLETED);
                return;
            default:
                setActiveTabIndex(TodoTabs.ALL);
                return;
        }
    }, [tab]);

    return (
        <div {...props}>
            <Input placeholder={'Create a new todo…'}
                   leftSide={<CheckBox checked={todoState}
                                       onClick={onToggleTodoState}
                   />}
                   value={todoText}
                   onKeyUp={onKeyUp}
                   onChange={onChangeInput}
            />

            <TodoTabList todos={filteredTodos}
                         onCheck={onCheck}
                         onRemove={onRemove}
                         onClear={onClear}
                         onCompleted={onCompleted}
                         onReorder={onReorder}
                         tabs={['All', 'Active', 'Completed']}
                         activeTabIndex={activeTabIndex}
                         onChangeTab={onChangeTab}
            />

            <Caption>
                Drag and drop to reorder list
            </Caption>
        </div>
    );
};

export default TodoContainer;
