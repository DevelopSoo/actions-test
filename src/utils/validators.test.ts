// src/utils/validators.test.ts
import { validateEmail, validatePassword, validateUser } from './validators';

describe('validateEmail 함수 검증', () => {
  test('유효한 이메일 주소 검증', () => {
    expect(validateEmail('test@example.com')).toBeTruthy();
    expect(validateEmail('user.name@domain.co.kr')).toBeTruthy();
  });

  test('유효하지 않은 이메일 주소 검증', () => {
    expect(validateEmail('invalid')).toBeFalsy();
    expect(validateEmail('invalid@')).toBeFalsy();
    expect(validateEmail('invalid@domain')).toBeFalsy();
    expect(validateEmail('')).toBeFalsy();
    // @ts-expect-error string이 아닌 값이 들어왔을 때, falsy 값 리턴
    expect(validateEmail(null)).toBeFalsy();
  });
});

describe('validatePassword 함수 검증', () => {
  test('8자 이상의 비밀번호는 유효함', () => {
    expect(validatePassword('password123')).toBeTruthy();
    expect(validatePassword('12345678')).toBeTruthy();
  });

  test('8자 미만의 비밀번호는 유효하지 않음', () => {
    expect(validatePassword('1234567')).toBeFalsy();
    expect(validatePassword('')).toBeFalsy();
    // @ts-expect-error string이 아닌 값이 들어왔을 때, falsy 값 리턴
    expect(validatePassword(null)).toBeFalsy();
  });
});

describe('validateUser 함수 검증', () => {
  test('유효한 사용자 객체를 검증해야 함', () => {
    const validUser = {
      name: '김철수',
      email: 'kim@example.com',
    };

    expect(validateUser(validUser)).toBeTruthy();
  });

  test('선택적 필드를 포함한 유효한 사용자 객체를 검증해야 함', () => {
    const validUserWithAge = {
      name: '김철수',
      email: 'kim@example.com',
      age: 30,
    };

    expect(validateUser(validUserWithAge)).toBeTruthy();
  });

  test('이메일이 없는 경우 유효하지 않음', () => {
    const userWithoutEmail = {
      name: '김철수',
    };

    // @ts-expect-error 잘못된 타입 입력 시 결과 확인
    expect(validateUser(userWithoutEmail)).toBeFalsy();
  });

  test('이름이 없는 경우 유효하지 않음', () => {
    const userWithoutName = {
      email: 'kim@example.com',
    };

    // @ts-expect-error 잘못된 타입 입력 시 결과 확인
    expect(validateUser(userWithoutName)).toBeFalsy();
  });

  test('이메일 형식이 올바르지 않은 경우 유효하지 않음', () => {
    const userWithInvalidEmail = {
      name: '김철수',
      email: 'invalid-email',
    };

    expect(validateUser(userWithInvalidEmail)).toBeFalsy();
  });

  test('이름 길이가 너무 짧은 경우 유효하지 않음', () => {
    const userWithShortName = {
      name: 'J',
      email: 'kim@example.com',
    };

    expect(validateUser(userWithShortName)).toBeFalsy();
  });

  test('나이가 음수인 경우 유효하지 않음', () => {
    const userWithNegativeAge = {
      name: '김철수',
      email: 'kim@example.com',
      age: -5,
    };

    expect(validateUser(userWithNegativeAge)).toBeFalsy();
  });

  test('객체가 아닌 입력은 유효하지 않음', () => {
    // @ts-expect-error 잘못된 타입 입력 시 결과 확인
    expect(validateUser(null)).toBeFalsy();
    // @ts-expect-error 잘못된 타입 입력 시 결과 확인
    expect(validateUser(undefined)).toBeFalsy();
    // @ts-expect-error 잘못된 타입 입력 시 결과 확인
    expect(validateUser('string')).toBeFalsy();
    // @ts-expect-error 잘못된 타입 입력 시 결과 확인
    expect(validateUser(123)).toBeFalsy();
  });
});

const someErrorFunction = () => {
  console.error('에러 발생');
};

test('에러 발생 시 console.error가 호출되는지 테스트', () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});
  someErrorFunction();
  expect(consoleErrorSpy).toHaveBeenCalledWith('에러 발생');
  consoleErrorSpy.mockRestore();
});
