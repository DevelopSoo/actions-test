// components/LoginButton.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export const LoginButton = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="p-4">
      {isAuthenticated ? (
        <button
          onClick={logout}
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          로그아웃
        </button>
      ) : (
        <button
          onClick={login}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          로그인
        </button>
      )}
    </div>
  );
};
