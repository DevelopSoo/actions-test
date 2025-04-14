// TodoItem.jsx
"use client";
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
    <div className="flex items-center p-2 border-b">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="mr-2"
      />
      <span
        className={`flex-1 ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
      >
        삭제
      </button>
    </div>
  );
}

export default TodoItem;
