"use client";

import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function Home() {
  const [data, setData] = useState<Post[]>([]);
  const [isPending, setIsPending] = useState(false);

  const [values, setValues] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchPosts = async () => {
      // try catch 문도 추가하면 좋겠네요.
      const res = await fetch("/api/posts");
      if (!res.ok) {
        alert("게시물 데이터 요청 실패");
        return;
      }
      const data = await res.json();
      setData(data);
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const newPost = {
      title: values.title,
      content: values.content,
    };
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    if (!res.ok) {
      alert("게시물 추가 실패");
      return;
    }
    const newData = await res.json();
    setData([...data, newData]);
    setValues({ title: "", content: "" });
    setIsPending(false);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      alert("게시물 삭제 실패");
      return;
    }
    setData(data.filter((post) => post.id !== id));
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">게시글 목록</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="border p-2 rounded-md"
          type="text"
          name="title"
          placeholder="제목"
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
        <textarea
          className="border p-2 rounded-md"
          name="content"
          placeholder="내용"
          value={values.content}
          onChange={(e) => setValues({ ...values, content: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? "제출 중..." : "제출"}
        </button>
      </form>

      <ul>
        {data?.map((post: { id: number; title: string; content: string }) => (
          <li key={post.id} className="border-b py-2">
            <h2 className="text-xl font-semibold">제목: {post.title}</h2>
            <p className="text-sm text-gray-600">내용: {post.content}</p>
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              onClick={() => handleDelete(post.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
