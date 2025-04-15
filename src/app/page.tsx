"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useFetchPosts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/posts");
      if (!res.ok) {
        throw new Error("데이터 패치 실패");
      }
      return res.json();
    },
  });

  return { data, isLoading, error };
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (post: { title: string; content: string }) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!res.ok) {
        throw new Error("데이터 추가 실패");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export default function Home() {
  const { data, isLoading, error } = useFetchPosts();
  const { mutate, isPending } = useCreatePost();
  const [values, setValues] = useState({ title: "", content: "" });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(values, {
      onSuccess: () => setValues({ title: "", content: "" }),
    });
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
          </li>
        ))}
      </ul>
    </div>
  );
}
