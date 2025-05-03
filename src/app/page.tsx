'use client';

import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function Home() {
  const [data, setData] = useState<Post[]>([]);
  const [isPending, setIsPending] = useState(false);

  const [values, setValues] = useState({ title: '', content: '' });

  useEffect(() => {
    console.log('useEffect');
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      if (!res.ok) {
        alert('게시물 데이터 요청 실패');
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
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });
    if (!res.ok) {
      alert('게시물 추가 실패');
      return;
    }
    const newData = await res.json();
    setData([...data, newData]);
    setValues({ title: '', content: '' });
    setIsPending(false);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      alert('게시물 삭제 실패');
      return;
    }
    setData(data.filter((post) => post.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">게시글 목록</h1>
      <p>환경: {process.env.NEXT_PUBLIC_MY_ENVIRONMENT}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="rounded-md border p-2"
          type="text"
          name="title"
          placeholder="제목"
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
        <textarea
          className="rounded-md border p-2"
          name="content"
          placeholder="내용"
          value={values.content}
          onChange={(e) => setValues({ ...values, content: e.target.value })}
        />
        <button
          type="submit"
          className="rounded-md bg-blue-500 p-2 text-white disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? '제출 중...' : '제출'}
        </button>
      </form>

      <ul>
        {data?.map((post: { id: number; title: string; content: string }) => (
          <li key={post.id} className="border-b py-2" data-testid="post">
            <h2 className="text-xl font-semibold">제목: {post.title}</h2>
            <p className="text-sm text-gray-600">내용: {post.content}</p>
            <button
              className="rounded-md bg-red-500 p-2 text-white"
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
