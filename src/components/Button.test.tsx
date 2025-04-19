import Button from './Button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('버튼이 화면에 표시되는지 확인', () => {
  // 버튼 렌더링
  render(<Button onClick={() => {}}>버튼내용</Button>);

  // 버튼 텍스트가 화면에 표시되는지 확인
  const button = screen.getByText('버튼내용');
  expect(button).toBeInTheDocument();
});

test('버튼을 클릭하면 onClick 함수가 호출되는지 확인', async () => {
  const user = userEvent.setup();
  // onClick props에 들어갈 함수를 모킹한다.
  const handleClick = jest.fn();
  // 모킹한 함수를 onClick props에 전달하여 버튼 렌더링
  render(<Button onClick={handleClick}>버튼내용</Button>);

  // 버튼을 클릭
  const button = screen.getByText('버튼내용');
  await user.click(button);

  // 버튼 클릭 시 모킹한 함수가 1번 호출되었는지 확인
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('버튼이 비활성화 상태인지 확인', () => {
  render(
    <Button onClick={() => {}} disabled>
      버튼내용
    </Button>
  );

  const button = screen.getByText('버튼내용');
  expect(button).toBeDisabled();
});
