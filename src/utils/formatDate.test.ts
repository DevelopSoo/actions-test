import formatDate from './formatDate';

test('2023년 1월 1일을 "2023-01-01" 형식으로 변환해야 함', () => {
  const date = new Date(2023, 0, 1);
  expect(formatDate(date)).toBe('2023-01-01');
});

test('2023년 12월 15일을 "2023-12-15" 형식으로 변환해야 함', () => {
  const date = new Date(2023, 11, 15);
  expect(formatDate(date)).toBe('2023-12-15');
});

test('유효하지 않은 입력에 대해 에러를 발생시켜야 함', () => {
  // @ts-expect-error 타입 오류 테스트
  expect(() => formatDate('2023-01-01')).toThrow('Invalid date');
  // @ts-expect-error 타입 오류 테스트
  expect(() => formatDate(null)).toThrow('Invalid date');
  // @ts-expect-error 타입 오류 테스트
  expect(() => formatDate(undefined)).toThrow('Invalid date');
});
