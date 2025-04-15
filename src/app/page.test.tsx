import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { useCreatePost, useFetchPosts } from "./page";
import Home from "./page";

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
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          id: 1,
          title: "리액트를 재밌게 공부하는 법",
          content: "리액트를 재밌게 공부하는 법이란 ~",
        },
        {
          id: 2,
          title: "Next.js를 재밌게 공부하는 법",
          content: "Next.js를 재밌게 공부하는 법이란 ~",
        },
      ]),
    });

    const { result } = renderHook(() => useFetchPosts(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual([
        {
          id: 1,
          title: "리액트를 재밌게 공부하는 법",
          content: "리액트를 재밌게 공부하는 법이란 ~",
        },
        {
          id: 2,
          title: "Next.js를 재밌게 공부하는 법",
          content: "Next.js를 재밌게 공부하는 법이란 ~",
        },
      ]);
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
    global.fetch = jest.fn().mockRejectedValue(new Error("데이터 패치 실패"));

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
  });

  afterEach(() => {
    queryClient.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test("게시물 생성 테스트", async () => {
    const initialPosts = [
      {
        id: 1,
        title: "리액트를 재밌게 공부하는 법",
        content: "리액트를 재밌게 공부하는 법이란 ~",
      },
      {
        id: 2,
        title: "Next.js를 재밌게 공부하는 법",
        content: "Next.js를 재밌게 공부하는 법이란 ~",
      },
    ];

    const newPost = {
      id: 3,
      title: "새로운 게시물",
      content: "새로운 게시물 내용",
    };

    global.fetch = jest
      .fn()
      // useFetchPosts 초기 데이터
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(initialPosts),
        })
      )
      // useCreatePost 호출
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve([...initialPosts, newPost]),
        })
      )
      // invalidateQueries 후 데이터 갱신
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve([...initialPosts, newPost]),
        })
      );

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
