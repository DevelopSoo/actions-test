// src/app/main/page.tsx

"use client";

import { useState } from "react";
import NewUserPromotionModal from "@/components/Modal/NewUserPromotionModal";
import { Button } from "@/stories/Button";

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">코드팡</h1>
      {isModalOpen && <NewUserPromotionModal onClose={handleCloseModal} />}
      <Button
        label="스토리북 버튼"
        primary
        backgroundColor="red"
        size="large"
        onClick={() => {
          alert("버튼 클릭");
        }}
      />
    </>
  );
}
