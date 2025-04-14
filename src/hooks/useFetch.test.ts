import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "./useFetch";

describe("useFetch 훅 테스트", () => {
  // fetch 모킹
  global.fetch = jest.fn();

  beforeEach(() => {
    // 테스트 전에 모든 모킹(호출 횟수 & 반환값)을 초기화한다.
    jest.resetAllMocks();
  });

  test("데이터를 성공적으로 가져오면 data, loading, error가 올바르게 설정된다", async () => {
    const mockData = {
      name: "김철수",
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const { result } = renderHook(() => useFetch("https://api/example.com"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });
  });

  test("에러가 발생하면 error가 올바르게 설정된다.", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("에러 발생"));

    const { result } = renderHook(() => useFetch("https://api.example.com"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(result.current.error?.message).toBe("에러 발생");
    });
  });
});
