// src/app/auth/login/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function LoginPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 이메일 형식 검사 함수

    if (!isValidEmail(values.email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log('?');
        return myResponseError(response);
      }

      router.push('/products');
    } catch (error) {
      Sentry.captureException(error);
      return null;
    }
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

function myResponseError(response: Response) {
  // 로그인 인증 문제 에러인 401 코드는 무시
  if (response.status === 401) {
    console.log('401 에러 무시');
    return null;
  }
  const error = new Error(
    `Fetch Error: ${response.status} ${response.statusText}`
  );
  error.cause = {
    status: response.status,
    statusText: response.statusText,
    url: response.url,
  };
  Sentry.captureException(error);
}
