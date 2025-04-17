jest.mock("axios");
import axios from "axios";

function setupApiMocks(apiResponses = {}) {
  const defaultResponses = {
    "/users": [
      {
        id: 1,
        name: "김철수",
        email: "kim@example.com",
      },
      {
        id: 2,
        name: "이영희",
        email: "lee@example.com",
      },
    ],
    "/products": [
      {
        id: 1,
        name: "사과",
        price: 1000,
      },
      {
        id: 2,
        name: "바나나",
        price: 2000,
      },
    ],
  };

  const responses = { ...defaultResponses, ...apiResponses };
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockImplementation((url) => {
    for (const [path, data] of Object.entries(responses)) {
      if (url.includes(path)) {
        return Promise.resolve({ data });
      }
    }
    return Promise.reject(new Error("Not found"));
  });
}

describe("설정 코드 분리 테스트", () => {
  // let localStorageMock;
  let customLocalStorage;
  beforeEach(() => {
    setupApiMocks();

    // 커스텀 localStorage 모킹
    customLocalStorage = {
      store: {},
      maxSize: 3, // 최대 3개의 키-값 쌍
      getItem: function (key: string) {
        return this.store[key] || null;
      },
      setItem: function (key: string, value: string) {
        if (
          Object.keys(this.store).length >= this.maxSize &&
          !this.store[key]
        ) {
          throw new DOMException("QuotaExceededError", "QuotaExceededError");
        }
        this.store[key] = value.toString();
      },
      clear: function () {
        this.store = {};
      },
    };

    // window.localStorage를 커스텀 구현으로 교체
    Object.defineProperty(window, "localStorage", {
      value: customLocalStorage,
    });
  });

  test("유저 데이터 조회 테스트", async () => {
    // 로컬 스토리지 모킹
    localStorage.setItem("user", "안녕");
    localStorage.setItem("user2", "안녕");
    const data = localStorage.getItem("user");
    expect(data).toBe("안녕");
  });

  test("상품 데이터 조회 테스트", async () => {
    const data = localStorage.getItem("user");
    expect(data).toBe("안녕");
  });
});
