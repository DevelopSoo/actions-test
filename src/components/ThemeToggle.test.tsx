// components/ThemeToggle.test.tsx
import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "@/helpers/renderWithTheme";
import { ThemeToggle } from "@/components/ThemeToggle";

describe("ThemeToggle 테스트", () => {
  test("라이트 모드 버튼 초기 렌더링", () => {
    renderWithTheme(<ThemeToggle />);
    expect(screen.getByText("다크 모드로 전환")).toBeInTheDocument();
  });

  test("다크 모드 버튼 클릭 시 라이트 모드로 전환", async () => {
    renderWithTheme(<ThemeToggle />);

    const toggleButton = screen.getByText("다크 모드로 전환");

    fireEvent.click(toggleButton);

    expect(screen.getByText("라이트 모드로 전환")).toBeInTheDocument();
  });

  test("다크 모드 버튼 초기 렌더링", () => {
    renderWithTheme(<ThemeToggle />, { theme: "dark" });
    expect(screen.getByText("라이트 모드로 전환")).toBeInTheDocument();
  });
});
