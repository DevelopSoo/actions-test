// src/components/LoginForm.tsx

"use client";

import { useState } from "react";

export default function EnhancedLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`로그인 정보: ${email}, ${password}, 기억하기: ${rememberMe}`);
  };

  return (
    <form role="form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">이메일:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          data-testid="email-input"
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <div>
        <label htmlFor="remember">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          로그인 정보 기억하기
        </label>
      </div>

      <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
        로그인
      </button>
    </form>
  );
}
