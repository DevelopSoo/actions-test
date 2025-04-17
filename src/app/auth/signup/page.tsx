// src/app/auth/signup.tsx

"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [isNewUser, setIsNewUser] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
      <h1 className="text-2xl font-bold text-center">회원가입 페이지</h1>
      {isNewUser ? (
        <div className="text-center border p-4 w-78 mx-auto">
          신규 가입자시군요! 쿠폰이 발급됐어요!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border p-2 rounded-md"
            name="email"
            type="text"
            placeholder="이메일"
            value={values.email}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded-md"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={values.password}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded-md"
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-78 mx-auto"
            type="submit"
          >
            회원가입
          </button>
        </form>
      )}
      <Link
        className="text-center block underline text-blue-500 w-78 mx-auto"
        href="/auth/login"
      >
        로그인 페이지로 이동
      </Link>
    </>
  );
}
