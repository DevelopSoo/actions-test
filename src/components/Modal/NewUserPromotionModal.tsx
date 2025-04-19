// src/components/Modal/NewUserPromotionModal.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function NewUserPromotionModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex h-64 w-64 flex-col justify-between rounded-md border border-gray-300 bg-white p-4 shadow-md">
      <h1 className="text-center text-2xl font-bold">신규 유저 대환영</h1>
      <div className="flex justify-between">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={() => {
            router.push('/auth/signup');
          }}
        >
          지금 가입하면 이득
        </button>
        <button
          className="rounded-md bg-red-500 px-4 py-2 text-white"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
