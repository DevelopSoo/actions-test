// src/app/auth/signup.tsx

'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [isNewUser, setIsNewUser] = useState(false);

  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // alert(`회원가입이 완료됐습니다. ${values.email}님 환영합니다.`);
    setIsNewUser(true);
    // router.push("/auth/login");
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold">회원가입 페이지</h1>
      {isNewUser ? (
        <div className="mx-auto w-78 border p-4 text-center">
          신규 가입자시군요! 쿠폰이 발급됐어요!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="rounded-md border p-2"
            name="email"
            type="text"
            placeholder="이메일"
            value={values.email}
            onChange={handleChange}
          />
          <input
            className="rounded-md border p-2"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={values.password}
            onChange={handleChange}
          />
          <input
            className="rounded-md border p-2"
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          <button
            className="mx-auto w-78 rounded-md bg-blue-500 px-4 py-2 text-white"
            type="submit"
          >
            회원가입
          </button>
        </form>
      )}
      <Link
        className="mx-auto block w-78 text-center text-blue-500 underline"
        href="/auth/login"
      >
        로그인 페이지로 이동
      </Link>
    </>
  );
}
