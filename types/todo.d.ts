type Todo = {
    id: number;
    completed: boolean;
    text: string;
};

interface TodoList {
    todos: Todo[];
    onCheck: (id: number) => void;
    onRemove: (id: number) => void;
    onClear: () => void;
    onCompleted: () => void;
    onReorder: (startIndex, endIndex) => void;
};
