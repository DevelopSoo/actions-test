import Home from "./page";
import { render, screen } from "@testing-library/react";

test("메인페이지가 제대로 렌더링되는지 테스트", () => {
  // 메인 페이지 렌더링
  render(<Home />);

  // 렌더링된 화면에서 "컴포넌트 테스트 연습하기" 텍스트를 가진 요소를 가져오기
  const element = screen.getByText("컴포넌트 테스트 연습하기");

  // 요소가 문서에 있는지 확인
  expect(element).toBeInTheDocument();
});
