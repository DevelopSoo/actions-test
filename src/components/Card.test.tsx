import { render } from "@testing-library/react";
import Card from "./Card";

test("Card 컴포넌트가 정보를 올바르게 표시합니다", () => {
  const cardProps = {
    title: "제목",
    description: "설명",
    imageUrl: "https://example.com/image.jpg",
  };

  const { container } = render(<Card {...cardProps} />);
  expect(container).toMatchSnapshot();
});
