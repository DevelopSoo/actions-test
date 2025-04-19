import { act, renderHook } from '@testing-library/react';
import useInputs from './useInputs';
import { ChangeEvent } from 'react';

describe('useInputs 테스트', () => {
  const initialValues = { username: '', email: '' };

  // 1. initialValues로 전달한 객체가 values에 올바르게 설정되는지 확인.
  test('초기값이 올바르게 설정되는지 확인', () => {
    const { result } = renderHook(() => useInputs(initialValues));
    expect(result.current.values).toEqual(initialValues);
  });

  // 2. handleChange로 한 필드의 값을 변경했을 때 values가 올바르게 업데이트되는지 확인.
  test('handleChange로 단일 필드 값이 제대로 업데이트 되는지 확인', () => {
    const { result } = renderHook(() => useInputs(initialValues));

    const mockEvent = {
      target: { name: 'username', value: '김철수' },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(mockEvent);
    });

    expect(result.current.values).toEqual({
      username: '김철수',
      email: '',
    });
  });

  // 3.handleChange로 여러 필드를 순차적으로 변경했을 때 모든 값이 올바르게 반영되는지 확인.
  test('handleChange로 여러 필드가 업데이트되는지 확인', () => {
    const { result } = renderHook(() => useInputs(initialValues));

    const usernameEvent = {
      target: { name: 'username', value: '김철수' },
    } as ChangeEvent<HTMLInputElement>;

    const emailEvent = {
      target: { name: 'email', value: 'kim@example.com' },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(usernameEvent);
      result.current.handleChange(emailEvent);
    });

    expect(result.current.values).toEqual({
      username: '김철수',
      email: 'kim@example.com',
    });
  });

  // 4. 값을 변경한 후 reset을 호출했을 때 values가 initialValues로 돌아가는지 확인.
  test('reset으로 값이 초기화되는지 확인', () => {
    const { result } = renderHook(() => useInputs(initialValues));

    const mockEvent = {
      target: { name: 'username', value: '김철수' },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(mockEvent); // 값 변경
      result.current.reset(); // 초기화
    });

    expect(result.current.values).toEqual(initialValues);
  });

  // 5. initialValues가 빈 객체({})일 때 handleChange와 reset이 정상 동작하는지 확인.
  // 동적 폼에서 초기값이 없을 수 있으므로 에지 케이스 테스트
  test('빈 초기값에서도 handleChange와 reset이 정상 동작한다', () => {
    const { result } = renderHook(() => useInputs({}));

    const mockEvent = {
      target: { name: 'username', value: '김철수' },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(mockEvent);
    });

    expect(result.current.values).toEqual({ username: '김철수' });

    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual({});
  });
});
