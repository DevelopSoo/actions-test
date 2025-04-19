// src/app/main/page.tsx

'use client';

import { useState } from 'react';
import NewUserPromotionModal from '@/components/Modal/NewUserPromotionModal';
import { Button } from '@/stories/Button';

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    fetch('/api/sentry-example-api')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    throw new Error('모달 닫기 오류');
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold">코드팡</h1>
      {isModalOpen && <NewUserPromotionModal onClose={handleCloseModal} />}
      <Button
        label="스토리북 버튼"
        primary
        backgroundColor="red"
        size="large"
        onClick={() => {
          alert('버튼 클릭');
        }}
      />
    </>
  );
}
