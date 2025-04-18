// src/app/page.test.tsx

import { INITIAL_POSTS, resetMockPosts } from '@/mocks/handlers/posts';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from './page';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

describe('게시물 페이지 테스트', () => {
  beforeEach(() => {
    resetMockPosts();
  });
  describe('게시물 목록 조회 테스트', () => {
    // API 모킹 테스트
    // 테스트로서의 가치는 별로 없습니다.
    test('게시물 목록을 올바르게 조회할 수 있다.', async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      expect(res.ok).toBe(true);
      expect(data).toHaveLength(2);
      expect(data).toEqual(INITIAL_POSTS);
    });

    // 렌더링 테스트
    // 컴포넌트 렌더링과 사용자 상호작용에 초점을 맞추는 것이 좋습니다.
    test('게시물 목록을 렌더링할 수 있다.', async () => {
      render(<Home />);

      await waitFor(() => {
        for (const post of INITIAL_POSTS) {
          expect(screen.getByText(`제목: ${post.title}`)).toBeInTheDocument();
        }
      });
    });
  });

  describe('게시물 추가 테스트', () => {
    test('새 게시물을 추가할 수 있다.', async () => {
      render(<Home />);

      // 사용자 입력
      const titleInput = screen.getByPlaceholderText('제목');
      const contentInput = screen.getByPlaceholderText('내용');
      const submitButton = screen.getByRole('button', { name: '제출' });

      const newPost = {
        title: '새로운 게시물 제목',
        content: '새로운 게시물 내용',
      };
      // 사용자 상호작용
      fireEvent.change(titleInput, { target: { value: newPost.title } });
      fireEvent.change(contentInput, {
        target: { value: newPost.content },
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(`제목: ${newPost.title}`)).toBeInTheDocument();
        expect(
          screen.getByText(`내용: ${newPost.content}`)
        ).toBeInTheDocument();
      });
    });
  });

  describe('게시물 삭제 테스트', () => {
    test('게시물을 삭제할 수 있다.', async () => {
      render(<Home />);

      // 초기 게시물 렌더링 대기
      await waitFor(() => {
        expect(
          screen.getByText(`제목: ${INITIAL_POSTS[0].title}`)
        ).toBeInTheDocument();
      });

      // 삭제 버튼 클릭
      const deleteButton = screen.getAllByRole('button', { name: '삭제' })[0];
      fireEvent.click(deleteButton);

      // 게시물이 삭제되었는지 확인
      await waitFor(() => {
        expect(
          screen.queryByText(`제목: ${INITIAL_POSTS[0].title}`)
        ).not.toBeInTheDocument();
        expect(screen.getAllByRole('listitem')).toHaveLength(
          INITIAL_POSTS.length - 1
        );
      });
    });

    test('게시물 삭제 실패 테스트', async () => {
      render(<Home />);

      // 초기 게시물 렌더링 대기
      await waitFor(() => {
        expect(
          screen.getByText(`제목: ${INITIAL_POSTS[0].title}`)
        ).toBeInTheDocument();
      });

      server.use(
        http.delete('/api/posts/:id', () => {
          return HttpResponse.json(
            { error: '게시물 삭제 실패' },
            { status: 400 }
          );
        })
      );

      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

      // 삭제 버튼 클릭
      const deleteButton = screen.getAllByRole('button', { name: '삭제' })[0];
      fireEvent.click(deleteButton);

      // 삭제 실패 메시지 확인
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('게시물 삭제 실패');
      });
    });
  });
});
