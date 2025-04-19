// hooks/useDebounce.test.ts
import { act, renderHook } from '@testing-library/react';
import useDebounce from './useDebounce';
import { waitFor } from '@testing-library/react';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // 타이머 모킹
  });

  afterEach(() => {
    jest.useRealTimers(); // 타이머 복원
  });

  // 1. 초기값 반환 테스트
  test('초기값을 즉시 반환한다', () => {
    const { result } = renderHook(() => useDebounce('초기값', 500));
    expect(result.current).toBe('초기값');
  });

  // 2. 지연 후 업데이트 테스트
  test('value 변경 후 delay 시간 경과 시 debouncedValue가 업데이트되는지 확인', async () => {
    // 목적: value 변경 후 delay 시간 경과 시 debouncedValue가 업데이트되는지 확인
    const { result, rerender } = renderHook(
      // 추후에 useDebounce의 인자를 수정할 수 있게 다음과 같이 작성
      ({ value, delay }) => useDebounce(value, delay),
      // 훅에 초기값 전달
      { initialProps: { value: '초기값', delay: 500 } }
    );

    // 훅에 새로운 값 전달
    rerender({ value: '새값', delay: 500 });

    // 지연 시간 전
    expect(result.current).toBe('초기값');

    // 타이머 진행
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('새값');
  });

  // 3. 타이머 재설정 테스트
  test('delay 시간 내에 value가 여러 번 바뀌었을 때 마지막 값만 반영되는지 확인', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: '초기값', delay: 500 } }
    );

    rerender({ value: '중간값', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(400); // 지연 시간 미만
    });
    // 아직 지연 시간이 지나지 않았으므로 초기값 유지
    expect(result.current).toBe('초기값');

    // 지연 시간 초과 후 최종값 반영
    rerender({ value: '최종값', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('최종값');
  });

  // 4. delay가 0일 때 debouncedValue가 즉시 업데이트되는지 확인
  it('delay가 0일 때 즉시 값을 업데이트한다', async () => {
    // 디바운스 없이 즉시 동작하는 경우 테스트 (에지 케이스)
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: '초기값', delay: 0 } }
    );

    rerender({ value: '새값', delay: 0 });

    await waitFor(() => {
      expect(result.current).toBe('새값'); // 즉시 업데이트
    });
  });
});
