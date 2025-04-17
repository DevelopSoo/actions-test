// components/LoginButton.test.tsx
import { fireEvent, screen } from "@testing-library/react";
import { LoginButton } from "./LoginButton";
import { renderWithAuth } from "@/helpers/renderWithAuth";

test("인증되지 않았을 때 로그인 버튼이 렌더링되는지 확인", () => {
  renderWithAuth(<LoginButton />);
  expect(screen.getByText("로그인")).toBeInTheDocument();
});

test("인증되었을 때 로그아웃 버튼이 렌더링되는지 확인", () => {
  const authValue = {
    isAuthenticated: true,
    login: jest.fn(),
    logout: jest.fn(),
  };

  renderWithAuth(<LoginButton />, authValue);
  expect(screen.getByText("로그아웃")).toBeInTheDocument();
});

test("로그인 버튼 클릭 시 로그인 함수가 호출되는지 확인", () => {
  const authValue = {
    isAuthenticated: false,
    login: jest.fn(),
    logout: jest.fn(),
  };

  renderWithAuth(<LoginButton />, authValue);

  const loginButton = screen.getByText("로그인");
  fireEvent.click(loginButton);
  expect(authValue.login).toHaveBeenCalled();
});

test("로그인 버튼 클릭 시 로그아웃 버튼으로 변경되는지 확인", async () => {
  renderWithAuth(<LoginButton />);

  const loginButton = screen.getByText("로그인");
  fireEvent.click(loginButton);
  expect(screen.getByText("로그아웃")).toBeInTheDocument();
});
