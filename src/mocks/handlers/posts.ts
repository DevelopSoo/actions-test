// /src/mocks/handlers/posts.ts

import { http, HttpResponse } from "msw";

export const INITIAL_POSTS = [
  {
    id: 1,
    title: "리액트를 재밌게 공부하는 법 (mock)",
    content: "리액트를 재밌게 공부하는 법이란 ~ (mock)",
  },
  {
    id: 2,
    title: "Next.js를 재밌게 공부하는 법 (mock)",
    content: "Next.js를 재밌게 공부하는 법이란 ~ (mock)",
  },
];

// 작업용 데이터 복사본
let mockPosts = [...INITIAL_POSTS];

// 데이터 초기화 함수
export const resetMockPosts = () => {
  mockPosts = [...INITIAL_POSTS];
};

export const postHandlers = [
  // /api/posts 요청에 대한 응답 모킹
  http.get("/api/posts", () => {
    return HttpResponse.json(mockPosts);
  }),

  // POST /api/posts: 새 게시물 추가
  http.post("/api/posts", async ({ request }) => {
    const newPost = await request.json();

    // 테스트 코드를 작성하면서 이 부분을 실제 API(route.ts)에 추가하는 것도 좋은 방법인 것 같다고 생각이 드네요.
    if (
      typeof newPost !== "object" ||
      !newPost ||
      typeof newPost.title !== "string" ||
      typeof newPost.content !== "string"
    ) {
      return HttpResponse.json(
        { error: "데이터 형식이 올바르지 않습니다." },
        { status: 400 }
      );
    }

    const postWithId = {
      id: mockPosts.length + 1, // 간단히 ID 생성 (실제론 UUID 등 사용 가능)
      title: newPost.title,
      content: newPost.content,
    };
    mockPosts.push(postWithId);
    return HttpResponse.json(postWithId, { status: 201 });
  }),
];
