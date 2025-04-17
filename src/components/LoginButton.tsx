// components/LoginButton.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";

export const LoginButton = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="p-4">
      {isAuthenticated ? (
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
        >
          로그아웃
        </button>
      ) : (
        <button
          onClick={login}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          로그인
        </button>
      )}
    </div>
  );
};
