// /src/mocks/handlers/posts.ts
import { http, HttpResponse } from 'msw';

// 모킹 데이터: 초기 게시물 목록
export const INITIAL_POSTS = [
  {
    id: 1,
    title: '리액트를 재밌게 공부하는 법 (mock)',
    content: '리액트를 재밌게 공부하는 법이란 ~ (mock)',
  },
  {
    id: 2,
    title: 'Next.js를 재밌게 공부하는 법 (mock)',
    content: 'Next.js를 재밌게 공부하는 법이란 ~ (mock)',
  },
];

// 작업용 데이터 복사본
let mockPosts = [...INITIAL_POSTS];

// 데이터 초기화 함수
export const resetMockPosts = () => {
  mockPosts = [...INITIAL_POSTS];
};

export const postHandlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', () => {
    return HttpResponse.json(mockPosts);
  }),
  // GET /api/posts: 게시물 목록 조회
  http.get('/api/posts', () => {
    return HttpResponse.json(mockPosts);
  }),

  // POST /api/posts: 새 게시물 추가
  http.post('/api/posts', async ({ request }) => {
    const newPost = await request.json();

    // 데이터 유효성 검사 (실제 API처럼)
    if (
      typeof newPost !== 'object' ||
      !newPost ||
      typeof newPost.title !== 'string' ||
      typeof newPost.content !== 'string'
    ) {
      return HttpResponse.json(
        { error: '제목과 내용은 문자열이어야 합니다.' },
        { status: 400 }
      );
    }

    const postWithId = {
      id: mockPosts.length + 1, // 간단한 ID 생성
      title: newPost.title,
      content: newPost.content,
    };
    mockPosts.push(postWithId);
    return HttpResponse.json(postWithId, { status: 201 });
  }),

  // DELETE /api/posts/:id: 게시물 삭제
  http.delete('/api/posts/:id', ({ params }) => {
    const id = Number(params.id);
    const postIndex = mockPosts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      return HttpResponse.json(
        { error: '게시물을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    mockPosts.splice(postIndex, 1);
    return HttpResponse.json({ message: '삭제 완료' }, { status: 200 });
  }),
];
