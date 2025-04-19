import axios from 'axios';

export function mockUserResponse(userData = {}) {
  const defaultUser = {
    id: 1,
    name: '김철수',
    username: 'kim',
    email: 'kim@example.com',
  };

  const user = { ...defaultUser, ...userData };

  const mockAxios = axios as jest.Mocked<typeof axios>;
  mockAxios.get.mockResolvedValue({ data: user });

  return user;
}
