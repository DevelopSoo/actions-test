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

  return <div>1123</div>;
}
