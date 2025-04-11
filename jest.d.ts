// 커스텀 매처 타입 정의
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidUser(): R;
    }
  }
}

export {};
