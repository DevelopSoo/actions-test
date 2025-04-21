jest.mock('axios');
import axios from 'axios';
import { fetchUserById, fetchUserData, getUserResponseById } from './user';

const mockedAxios = axios as jest.Mocked<typeof axios>;

test('사용자 정보를 성공적으로 가져와야 함', async () => {
  mockedAxios.get.mockResolvedValue({
    data: {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
  });
  const data = await fetchUserData(1);
  expect(data).toEqual({
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  });
});

test('사용자 정보를 가져오는데 실패하는 경우', async () => {
  mockedAxios.get.mockRejectedValue(new Error('네트워크 오류'));

  // 없어도 통과하지만 추후에 실수를 방지하기 위해 작성하는 것이 좋습니다.
  expect.assertions(1);
  try {
    await fetchUserData(1);
  } catch (e: unknown) {
    if (e instanceof Error) {
      expect(e.message).toBe(
        '사용자 데이터를 가져오는데 실패했습니다: 네트워크 오류'
      );
    } else {
      fail('예상되는 예외가 발생하지 않았습니다.');
    }
  }
});

test('커스텀 매쳐 테스트', () => {
  const user = {
    name: '김철수',
    email: 'kim@example.com',
    password: '12345678',
  };

  expect(user).toBeValidUser();
});

test('유저 객체의 속성을 직접 검사하기', () => {
  const user = {
    name: '김철수',
    email: 'kim@example.com',
    password: '12345678',
  };

  expect(typeof user).toBe('object');
  expect(user).not.toBeNull(); // null도 typeof가 'object'이므로 확인 필요

  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('password');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  expect(emailRegex.test(user.email)).toBe(true);

  expect(user.password.length).toBeGreaterThanOrEqual(8);
  expect(user.name.length).toBeGreaterThanOrEqual(2);
});

test('fetchUserById 테스트', () => {
  const user = fetchUserById('1');
  expect(user).toEqual({
    id: '1',
    name: '김철수',
    email: 'kim@example.com',
  });
});

test('getUserResponseById 테스트', () => {
  const user = getUserResponseById('1');
  expect(user).toEqual({
    success: true,
    message: '유저 정보를 성공적으로 조회했습니다',
    data: {
      id: '1',
      name: '김철수',
      email: 'kim@example.com',
    },
  });
});
