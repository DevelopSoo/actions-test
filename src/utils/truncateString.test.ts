import truncateString from "./truncateString";

test("문자열이 최대 길이보다 짧으면 그대로 반환해야 함", () => {
  expect(truncateString("Hello", 10)).toBe("Hello");
});

test('문자열이 최대 길이보다 길면 자르고 "..."를 추가해야 함', () => {
  expect(truncateString("Hello World", 8)).toBe("Hello...");
});

test("not 수식어 사용 예", () => {
  expect(1 + 1).not.toBe(3);
  expect("hello").not.toMatch(/world/);
  expect(["apple", "banana"]).not.toContain("orange");
});
