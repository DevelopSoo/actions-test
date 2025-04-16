import { test, expect } from "@playwright/test";

test("홈페이지 접속 테스트", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByText("게시글 목록")).toBeVisible();
});
