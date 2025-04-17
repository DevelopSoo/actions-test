// src/tests/new-user-promotion.spec.ts

import { test, expect } from "@playwright/test";

test("신규 가입자를 위한 쿠폰 발급 시나리오", async ({ page }) => {
  // 메인 페이지로 접속한다.
  await page.goto("http://localhost:3000/main");
  // 지금 가입하면 이득 버튼을 클릭한다.
  await page.getByRole("button", { name: "지금 가입하면 이득" }).click();
  // 이메일 입력창에 abc@naver.com을 입력한다.
  await page.getByRole("textbox", { name: "이메일" }).fill("abc@naver.com");
  // 비밀번호 입력창에 123123을 입력한다.
  await page
    .getByRole("textbox", { name: "비밀번호", exact: true })
    .fill("123123");
  // 비밀번호 확인 입력창에 123123을 입력한다.
  await page.getByRole("textbox", { name: "비밀번호 확인" }).fill("123123");
  // 회원가입 버튼을 클릭한다.
  await page.getByRole("button", { name: "회원가입" }).click();
  // 신규 가입자시군요! 쿠폰이 발급됐어요! 문구가 보이는지 확인한다.
  await expect(
    page.getByText("신규 가입자시군요! 쿠폰이 발급됐어요!")
  ).toBeVisible();
});
