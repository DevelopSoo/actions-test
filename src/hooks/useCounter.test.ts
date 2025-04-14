import { act, renderHook } from "@testing-library/react";
import useCounter from "./useCounter";

describe("useCounter 훅 테스트", () => {
  test("초기값이 올바르게 설정된다", () => {
    // 1. renderHook 함수의 인자로 useCounter 훅을 전달합니다.
    const { result } = renderHook(() => useCounter(5));
    // 2. result의 내부에 useCounter 훅이 반환하는 객체(current)가 존재하며,
    // current.count와 같이 훅의 상태를 확인할 수 있습니다.
    expect(result.current.count).toBe(5);
  });

  test("increment 함수를 호출하면 count가 1 증가한다", () => {
    const { result } = renderHook(() => useCounter(0));

    // 3. 훅의 함수를 호출하여 상태를 변경합니다.
    // act 함수는 상태 업데이트를 동기적으로 처리해 테스트의 예측 가능성을 높입니다.
    act(() => {
      result.current.increment();
    });

    // 4. 변경된 상태를 확인합니다.
    expect(result.current.count).toBe(1);
  });

  test("decrement 함수를 호출하면 count가 1 감소한다", () => {
    const { result } = renderHook(() => useCounter(1));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(0);
  });

  test("reset 함수를 호출하면 count가 초기값으로 초기화된다", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment(); // 11로 변경
      result.current.reset(); // 10으로 초기화
    });

    expect(result.current.count).toBe(10);
  });

  test("double 함수를 호출하면 count가 2배로 증가한다", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.double();
    });

    expect(result.current.count).toBe(10);
  });
});
