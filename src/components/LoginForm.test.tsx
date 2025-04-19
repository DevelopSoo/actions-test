import { fireEvent, render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import userEvent from '@testing-library/user-event';

test('로그인 폼이 올바르게 렌더링 되는지 확인', () => {
  render(<LoginForm />);

  // 라벨로 입력(input) 요소 찾기
  const emailByLabel = screen.getByLabelText('이메일:');

  // 플레이스홀더로 입력 요소 찾기
  const emailByPlaceholder = screen.getByPlaceholderText('이메일을 입력하세요');

  // 역할로 버튼 찾기
  const loginButton = screen.getByRole('button', { name: '로그인' });

  // 테스트 ID로 요소 찾기
  const emailByTestId = screen.getByTestId('email-input');

  // 모든 요소가 화면에 있는지 확인
  expect(emailByLabel).toBeInTheDocument();
  expect(emailByPlaceholder).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(emailByTestId).toBeInTheDocument();

  // emailByLabel, emailByPlaceholder, emailByTestId가 동일한 요소인지 확인
  expect(emailByLabel).toBe(emailByPlaceholder);
  expect(emailByLabel).toBe(emailByTestId);
});

test('키보드로 폼 탐색 및 제출 테스트 (fireEvent 방식)', () => {
  render(<LoginForm />);

  // alert 모킹 설정
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  // 처음 포커스를 이메일 필드에 맞춤
  const emailInput = screen.getByLabelText('이메일:');
  // 이메일 필드에 포커스 설정
  // fireEvent.click(emailInput);
  emailInput.focus();
  // 이메일 필드에 포커스가 되어있는지 확인
  expect(emailInput).toHaveFocus();

  // 이메일 입력
  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

  // Tab 키를 눌러 다음 필드로 이동
  fireEvent.keyDown(emailInput, { key: 'Tab', code: 'Tab' });

  // 비밀번호 필드가 포커스 되어 있는지 확인
  const passwordInput = screen.getByLabelText('비밀번호:');
  // 이전에 Tab을 눌러 다음 필드로 이동했기 때문에 비밀번호 필드에 자동으로 focus 되는 게 정상이지만
  // fireEvent는 자동으로 focus 되지 않기 때문에 수동으로 focus 설정
  passwordInput.focus();
  expect(passwordInput).toHaveFocus();

  // 비밀번호 입력
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Tab 키를 눌러 체크박스로 이동
  fireEvent.keyDown(passwordInput, { key: 'Tab', code: 'Tab' });

  // 체크박스가 포커스 되어 있는지 확인
  const checkbox = screen.getByRole('checkbox');
  checkbox.focus();
  expect(checkbox).toHaveFocus();

  // 스페이스바를 눌러 체크박스 선택
  fireEvent.keyDown(checkbox, { key: ' ', code: 'Space' });
  fireEvent.click(checkbox);

  // Tab 키를 눌러 제출 버튼으로 이동
  fireEvent.keyDown(checkbox, { key: 'Tab', code: 'Tab' });

  // 제출 버튼이 포커스 되어 있는지 확인
  const submitButton = screen.getByRole('button', { name: '로그인' });
  submitButton.focus();
  expect(submitButton).toHaveFocus();

  // Enter 키를 눌러 제출
  fireEvent.keyDown(submitButton, { key: 'Enter', code: 'Enter' });
  fireEvent.click(submitButton);

  // 폼이 제대로 제출되었는지 확인
  expect(alertSpy).toHaveBeenCalledWith(
    '로그인 정보: test@test.com, password123, 기억하기: true'
  );

  alertSpy.mockRestore();
});

test('키보드로 폼 탐색 및 제출 테스트 (userEvent 방식)', async () => {
  // userEvent 설정
  const user = userEvent.setup();

  render(<LoginForm />);

  // alert 모킹 설정
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  // 이메일 필드 입력
  const emailInput = screen.getByLabelText('이메일:');
  await user.type(emailInput, 'test@test.com');

  // Tab 키로 다음 필드로 이동
  await user.tab();

  // 비밀번호 필드가 포커스 되어 있는지 확인
  const passwordInput = screen.getByLabelText('비밀번호:');
  expect(passwordInput).toHaveFocus();

  // 비밀번호 입력
  await user.type(passwordInput, 'password123');

  // Tab 키로 체크박스로 이동하고 스페이스바로 선택
  await user.tab();
  await user.keyboard(' '); // 스페이스바로 체크박스 토글

  // Tab 키로 제출 버튼으로 이동하고 엔터로 제출
  await user.tab();
  await user.keyboard('{Enter}'); // 엔터 키로 폼 제출

  // 폼이 제대로 제출되었는지 확인
  expect(alertSpy).toHaveBeenCalledWith(
    '로그인 정보: test@test.com, password123, 기억하기: true'
  );

  alertSpy.mockRestore();
});
