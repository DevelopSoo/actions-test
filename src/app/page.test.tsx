import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { useCreatePost, useFetchPosts } from "./page";
import Home from "./page";
import { INITIAL_POSTS, resetMockPosts } from "@/mocks/handlers/posts";
import { server } from "@/mocks";
import { http, HttpResponse } from "msw";

describe("useFetchPosts 훅 테스트", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    queryClient.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test("데이터 패치 테스트", async () => {
    const { result } = renderHook(() => useFetchPosts(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(INITIAL_POSTS);
    });
  });
});

describe("Home 컴포넌트 테스트", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    queryClient.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test("에러 시 UI 렌더링 테스트", async () => {
    server.use(
      http.get("/api/posts", () => {
        return HttpResponse.json(
          { message: "데이터 패치 실패" },
          { status: 500 }
        );
      })
    );
    render(<Home />, { wrapper });

    await waitFor(() => {
      expect(
        screen.getByText("에러 발생: 데이터 패치 실패")
      ).toBeInTheDocument();
    });
  });
});

describe("useCreatePost 훅 테스트", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    resetMockPosts(); // 각 테스트 전에 mockPosts 초기화
  });

  afterEach(() => {
    queryClient.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test("게시물 생성 테스트", async () => {
    const newPost = {
      id: 3, // MSW에서 id: mockPosts.length + 1로 생성됨
      title: "새로운 게시물",
      content: "새로운 게시물 내용",
    };

    const { result: queryResult } = renderHook(() => useFetchPosts(), {
      wrapper,
    });
    const { result: mutationResult } = renderHook(() => useCreatePost(), {
      wrapper,
    });

    // 초기 데이터 확인
    await waitFor(() => {
      expect(queryResult.current.data).toHaveLength(2);
    });

    // 새 게시물 생성
    mutationResult.current.mutate({
      title: "새로운 게시물",
      content: "새로운 게시물 내용",
    });

    // 데이터 갱신 확인
    await waitFor(() => {
      expect(queryResult.current.data).toHaveLength(3);
      expect(queryResult.current.data).toContainEqual(newPost);
    });
  });
});
