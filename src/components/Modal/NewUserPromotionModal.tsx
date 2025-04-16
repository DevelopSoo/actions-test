// src/components/Modal/NewUserPromotionModal.tsx
"use client";

import { useRouter } from "next/navigation";

export default function NewUserPromotionModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const router = useRouter();

  return (
    <div className="w-64 h-64 bg-white rounded-md border border-gray-300 shadow-md flex flex-col justify-between p-4">
      <h1 className="text-2xl font-bold text-center">신규 유저 대환영</h1>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            router.push("/auth/signup");
          }}
        >
          지금 가입하면 이득
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
