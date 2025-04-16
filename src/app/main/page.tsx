// src/app/main/page.tsx

"use client";

import { useState } from "react";
import NewUserPromotionModal from "@/components/Modal/NewUserPromotionModal";

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">코드팡</h1>
      {isModalOpen && <NewUserPromotionModal onClose={handleCloseModal} />}
    </>
  );
}
