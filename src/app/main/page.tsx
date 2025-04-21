// src/app/main/page.tsx

'use client';

import { useState } from 'react';
import NewUserPromotionModal from '@/components/Modal/NewUserPromotionModal';
import { Button } from '@/stories/Button';
import * as Sentry from '@sentry/nextjs';

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    fetch('/api/sentry-example-api')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    throw new Error('모달 닫기 오류');
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold">코드팡</h1>
      {isModalOpen && <NewUserPromotionModal onClose={handleCloseModal} />}
      <button
        onClick={() => {
          Sentry.captureMessage('메인 페이지, 메시지 호출');
        }}
      >
        메시지 호출하기
      </button>
      <button
        onClick={() => {
          try {
            throw new CustomSentryError(
              `[Error Code] - 메인 페이지, 에러 호출 에러`,
              '누르면 안되는 걸 누르셨습니다'
            );
            // throw new CustomSentryError('에러 호출 완료');
          } catch (error) {
            alert('에러 호출 완료');
            Sentry.captureException(error);
          }
        }}
      >
        커스텀 에러 호출하기
      </button>
      <button
        onClick={() => {
          throw new Error('비튼');
        }}
      >
        beforeSend 노필터링
      </button>
      <Button
        label="스토리북 버튼"
        primary
        backgroundColor="red"
        size="large"
        onClick={() => {
          try {
            throw new Error('withScope 테스트 에러2');
          } catch (error) {
            Sentry.withScope((scope) => {
              scope.setLevel('warning');
              scope.setContext('버튼 클릭', {
                url: window.location.href,
                content: '스토리북 버튼 눌렀다',
              });

              scope.setContext('에러', {
                메세지: error instanceof Error ? error.message : String(error),
                스택: error instanceof Error ? error.stack : undefined,
              });

              scope.setTags({
                mytag: '검색용태그',
              });

              Sentry.captureException(error);
            });
          }
        }}
      />
    </>
  );
}

// class SentryError extends Error {
//   private static generateName(url: string, status: number): string {
//     return `[${status} Error] - ${url}`;
//   }

//   public response?: Response;
//   public request: Request;
//   public url: string;
//   public status?: number;

//   constructor(request: Request, response?: Response) {
//     const status = response?.status || 0;

//     const message = `실패했습니다. ${status} ${request.url}`;
//     super(message);
//     this.name = response
//       ? SentryError.generateName(request.url, status)
//       : `[Network Error] - ${request.url}`;

//     this.request = request;
//     this.response = response;
//     this.url = request.url;
//     this.status = response?.status;
//   }
// }

class CustomSentryError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}
