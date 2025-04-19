'use client';

import { useState } from 'react';

export default function TodoInput({
  onAddTodo,
}: {
  onAddTodo: (text: string) => void;
}) {
  const [text, setText] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTodo(text);
    setText('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="할 일을 입력하세요"
        className="rounded border border-gray-300 p-2"
      />
      <button
        type="submit"
        className="ml-2 rounded bg-blue-500 px-4 py-2 text-white"
      >
        추가
      </button>
    </form>
  );
}
