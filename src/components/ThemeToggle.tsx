// components/ThemeToggle.tsx
"use client";

import { useTheme } from "@/contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-4">
      <button
        onClick={toggleTheme}
        className={`${
          theme === "light"
            ? "bg-gray-200 text-black hover:bg-gray-300 px-4 py-2 rounded-md"
            : "bg-gray-800 text-white hover:bg-gray-900 px-4 py-2 rounded-md"
        }`}
      >
        {theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}
      </button>
    </div>
  );
};
