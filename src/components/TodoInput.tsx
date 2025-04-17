"use client";

import { useState } from "react";

export default function TodoInput({
  onAddTodo,
}: {
  onAddTodo: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTodo(text);
    setText("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="할 일을 입력하세요"
        className="border border-gray-300 rounded p-2"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        추가
      </button>
    </form>
  );
}
