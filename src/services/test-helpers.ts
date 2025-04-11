import axios from "axios";

export function setupLocalStorageMock() {
  const localStorageMock = {
    store: {} as Record<string, string>,
    getItem: jest.fn(function (key: string) {
      return this.store[key] || null;
    }),
    setItem: jest.fn(function (key: string, value: string) {
      this.store[key] = value.toString();
    }),
    removeItem: jest.fn(function (key: string) {
      delete this.store[key];
    }),
    clear: jest.fn(function () {
      this.store = {} as Record<string, string>;
    }),
  };

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });
  return localStorageMock;
}

export function createUser(overrides = {}) {
  return {
    id: 1,
    name: "김철수",
    email: "kim@example.com",
    ...overrides,
  };
}

export const axiosMock = axios as jest.Mocked<typeof axios>;

export function mockLoginSuccess(user = createUser(), token = "fake-token") {
  axiosMock.post.mockResolvedValue({
    data: {
      user,
      token,
    },
  });
  return {
    user,
    token,
  };
}
export function mockLoginFailure() {
  axiosMock.post.mockRejectedValue({
    response: {
      status: 401,
      data: { message: "잘못된 로그인 정보입니다" },
    },
  });
}

export function mockGetCurrentUserSuccess(user = createUser()) {
  axiosMock.get.mockResolvedValue({
    data: user,
  });
  return user;
}
