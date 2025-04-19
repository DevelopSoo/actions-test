import { daysDifference, formatDate, isWeekend } from './dateUtils';

describe('dateUtils', () => {
  describe('formatDate 함수', () => {
    test('날짜를 YYYY-MM-DD 형식으로 포맷팅해야 함', () => {
      const date = new Date(2023, 0, 1); // 2023년 1월 1일 (월은 0부터 시작)
      expect(formatDate(date)).toBe('2023-01-01');
    });

    test('다른 구분자를 사용할 수 있어야 함', () => {
      const date = new Date(2023, 0, 1);
      expect(formatDate(date, '/')).toBe('2023/01/01');
      expect(formatDate(date, '.')).toBe('2023.01.01');
    });

    test('10월 이상의 월과 10일 이상의 날짜도 올바르게 포맷팅해야 함', () => {
      const date = new Date(2023, 9, 15); // 2023년 10월 15일
      expect(formatDate(date)).toBe('2023-10-15');
    });

    test('10월 미만의 월과 10일 미만의 날짜는 앞에 0을 붙여야 함', () => {
      const date = new Date(2023, 1, 9); // 2023년 2월 9일
      expect(formatDate(date)).toBe('2023-02-09');
    });

    test('유효하지 않은 날짜는 빈 문자열을 반환해야 함', () => {
      expect(formatDate(new Date('Invalid Date'))).toBe('');
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(formatDate(null)).toBe('');
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(formatDate('2023-01-01')).toBe('');
    });
  });

  describe('daysDifference 함수', () => {
    test('두 날짜 간의 일수 차이를 계산해야 함', () => {
      const date1 = new Date(2023, 0, 1); // 2023년 1월 1일
      const date2 = new Date(2023, 0, 6); // 2023년 1월 6일

      expect(daysDifference(date1, date2)).toBe(5);
    });

    test('날짜 순서가 반대이면 음수 결과를 반환해야 함', () => {
      const date1 = new Date(2023, 0, 6); // 2023년 1월 6일
      const date2 = new Date(2023, 0, 1); // 2023년 1월 1일

      expect(daysDifference(date1, date2)).toBe(-5);
    });

    test('같은 날짜는 0을 반환해야 함', () => {
      const date1 = new Date(2023, 0, 1);
      const date2 = new Date(2023, 0, 1);

      expect(daysDifference(date1, date2)).toBe(0);
    });

    test('시간, 분, 초를 무시하고 날짜만 비교해야 함', () => {
      const date1 = new Date(2023, 0, 1, 10, 30); // 2023년 1월 1일 10:30
      const date2 = new Date(2023, 0, 2, 8, 15); // 2023년 1월 2일 8:15

      expect(daysDifference(date1, date2)).toBe(1);
    });

    test('유효하지 않은 날짜는 NaN을 반환해야 함', () => {
      const validDate = new Date(2023, 0, 1);
      const invalidDate = new Date('Invalid Date');

      expect(daysDifference(validDate, invalidDate)).toBeNaN();
      expect(daysDifference(invalidDate, validDate)).toBeNaN();
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(daysDifference(null, validDate)).toBeNaN();
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(daysDifference(validDate, null)).toBeNaN();
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(daysDifference('string', validDate)).toBeNaN();
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(daysDifference(validDate, 'string')).toBeNaN();
    });
  });

  describe('isWeekend 함수', () => {
    test('토요일은 주말로 인식해야 함', () => {
      // 2023년 1월 7일은 토요일
      const saturday = new Date(2023, 0, 7);
      expect(isWeekend(saturday)).toBe(true);
    });

    test('일요일은 주말로 인식해야 함', () => {
      // 2023년 1월 8일은 일요일
      const sunday = new Date(2023, 0, 8);
      expect(isWeekend(sunday)).toBe(true);
    });

    test('평일은 주말로 인식하지 않아야 함', () => {
      // 2023년 1월 2일은 월요일
      const monday = new Date(2023, 0, 2);
      expect(isWeekend(monday)).toBe(false);

      // 2023년 1월 3일은 화요일
      const tuesday = new Date(2023, 0, 3);
      expect(isWeekend(tuesday)).toBe(false);

      // 2023년 1월 4일은 수요일
      const wednesday = new Date(2023, 0, 4);
      expect(isWeekend(wednesday)).toBe(false);

      // 2023년 1월 5일은 목요일
      const thursday = new Date(2023, 0, 5);
      expect(isWeekend(thursday)).toBe(false);

      // 2023년 1월 6일은 금요일
      const friday = new Date(2023, 0, 6);
      expect(isWeekend(friday)).toBe(false);
    });

    test('유효하지 않은 날짜는 false를 반환해야 함', () => {
      expect(isWeekend(new Date('Invalid Date'))).toBe(false);
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(isWeekend(null)).toBe(false);
      // @ts-expect-error 잘못된 타입 입력 테스트
      expect(isWeekend('2023-01-01')).toBe(false);
    });
  });
});
