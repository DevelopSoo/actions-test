// TodoItem.jsx
'use client';
function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex items-center border-b p-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="mr-2"
      />
      <span
        className={`flex-1 ${
          todo.completed ? 'text-gray-500 line-through' : ''
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-2 rounded bg-red-500 px-2 py-1 text-white"
      >
        삭제
      </button>
    </div>
  );
}

export default TodoItem;
