"use client";

import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <h1>컴포넌트 테스트 연습하기</h1>
      <Button onClick={() => alert("버튼 클릭")}>버튼</Button>
    </>
  );
}
