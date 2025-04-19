// tests/auth/signup.spec.ts

import { test, expect } from '@playwright/test';

test.describe('회원가입 페이지 E2E 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/auth/signup');
  });

  test('회원가입 페이지가 올바르게 로드되는지 확인', async ({ page }) => {
    const heading = page.getByRole('heading', { name: '회원가입 페이지' });
    await expect(heading).toBeVisible();
  });

  test('로그인 링크가 올바르게 작동하는지 확인', async ({ page }) => {
    const loginLink = page.getByRole('link', { name: '로그인 페이지로 이동' });
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    await expect(page).toHaveURL('http://localhost:3000/auth/login');
  });

  // test("회원가입 폼이 올바르게 작동하는지 확인", async ({ page }) => {
  //   const emailInput = page.getByPlaceholder("이메일");
  //   const passwordInput = page.getByPlaceholder("비밀번호", { exact: true });
  //   const confirmPasswordInput = page.getByPlaceholder("비밀번호 확인");
  //   const submitButton = page.getByRole("button", { name: "회원가입" });

  //   await emailInput.fill("test@test.com");
  //   await passwordInput.fill("123123");
  //   await confirmPasswordInput.fill("123123");
  //   await submitButton.click();

  //   await expect(page).toHaveURL("http://localhost:3000/auth/login");
  // });
});
