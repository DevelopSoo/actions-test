// src/app/auth/login/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/products");
  };
  return (
    <>
      <h1>로그인 페이지</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
        />

        <button type="submit">로그인</button>
      </form>
      <Link href="/auth/signup">회원가입 페이지로 이동</Link>
    </>
  );
}
