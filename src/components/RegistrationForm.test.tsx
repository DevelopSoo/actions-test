import { render, screen } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';

test('회원가입 폼 테스트 (접근성 우선순위 적용)', () => {
  render(<RegistrationForm />);

  // 1. getByRole 사용 (가장 권장)
  const heading = screen.getByRole('heading', { name: '회원가입' });
  const usernameInput = screen.getByRole('textbox', { name: '사용자 이름:' });
  const submitButton = screen.getByRole('button', { name: '가입하기' });

  // 2. getByLabelText 사용 (폼 요소에 적합)
  const passwordInput = screen.getByLabelText('비밀번호:');

  // 모든 요소가 문서에 있는지 확인
  expect(heading).toBeInTheDocument();
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
