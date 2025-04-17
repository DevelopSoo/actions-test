// hooks/useFetch.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "./useFetch";
import { INITIAL_POSTS } from "@/mocks/handlers/posts";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("useFetch 훅 테스트", () => {
  test("데이터를 성공적으로 가져오면 data, loading, error가 올바르게 설정된다", async () => {
    const { result } = renderHook(() => useFetch("/api/posts"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(INITIAL_POSTS);
      expect(result.current.error).toBe(null);
    });
  });

  test("에러가 발생하면 error가 올바르게 설정된다.", async () => {
    server.use(
      http.get("/api/posts", () => {
        // status: 500이 발생하면 자동으로 response.ok는 false가 됩니다.
        // 기존 API 모킹 방식에 비해 실제 네트워크 반환값과 유사하게 테스트할 수 있게 됩니다.
        return HttpResponse.json({ message: "에러 발생" }, { status: 500 });
      })
    );
    const { result } = renderHook(() => useFetch("/api/posts"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(result.current.error?.message).toBe("에러 발생");
    });
  });
});
