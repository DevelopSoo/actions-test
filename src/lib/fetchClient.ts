// lib/fetchClient.ts
import * as Sentry from '@sentry/nextjs';
import { SentryFetchError } from './errors/SentryFetchError';

// URL과 옵션을 받아 fetch 요청을 수행하고 에러 처리를 담당하는 함수
export async function fetchWithSentry(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // Request 객체 생성
  const request = new Request(url, options);

  try {
    // fetch 요청 수행
    const response = await fetch(request);

    // 응답이 실패한 경우 (status가 200-299 범위가 아닌 경우)
    if (!response.ok) {
      // SentryFetchError 인스턴스 생성
      const sentryError = new SentryFetchError(request, response);

      // HTTP 상태 코드에 따른 에러 심각도 결정
      let level: Sentry.SeverityLevel;
      console.log({ status: response.status });
      if (response.status >= 500) {
        level = 'error'; // 서버 에러 (500번대)
      } else if (response.status >= 400) {
        level = 'warning'; // 클라이언트 에러 (400번대)
      } else {
        level = 'info'; // 기타 에러
      }

      // Sentry에 에러 정보 전송을 위한 스코프 설정
      Sentry.withScope((scope) => {
        // 에러 심각도 설정
        scope.setLevel(level);

        // 요청 관련 컨텍스트 정보 설정
        scope.setContext('Request', {
          url: request.url,
          method: request.method,
          headers: Object.fromEntries(request.headers.entries()),
        });

        // 응답 데이터 파싱 및 컨텍스트 정보 설정
        // response.clone()을 사용하는 이유: response body는 한 번만 읽을 수 있기 때문
        response
          .clone()
          .text()
          .then((responseText) => {
            try {
              // JSON 응답인 경우 파싱 시도
              const responseData = JSON.parse(responseText);
              scope.setContext('Response', {
                status: response.status,
                statusText: response.statusText,
                data: responseData,
              });
            } catch {
              // JSON이 아닌 경우 텍스트로 처리 (최대 1000자로 제한)
              scope.setContext('Response', {
                status: response.status,
                statusText: response.statusText,
                text: responseText.substring(0, 1000),
              });
            }

            // Sentry에 에러 전송
            Sentry.captureException(sentryError);
          })
          .catch((err) => {
            // 응답 파싱 실패 시 에러 정보 설정
            scope.setContext('Response', {
              status: response.status,
              statusText: response.statusText,
              parseError: err.message,
            });

            // Sentry에 에러 전송
            Sentry.captureException(sentryError);
          });
      });

      // 에러를 상위로 전파
      throw sentryError;
    }

    // 성공적인 응답 반환
    return response;
  } catch (error) {
    // SentryFetchError 인스턴스인 경우 그대로 전파
    if (error instanceof SentryFetchError) {
      throw error;
    }

    // 네트워크 에러 등 다른 에러의 경우 새로운 SentryFetchError 생성
    const sentryError = new SentryFetchError(request);

    // Sentry에 에러 정보 전송을 위한 스코프 설정
    Sentry.withScope((scope) => {
      // 네트워크 에러는 항상 error 레벨로 설정
      scope.setLevel('error');

      // 요청 관련 컨텍스트 정보 설정
      scope.setContext('Request', {
        url: request.url,
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
      });

      // 에러 관련 컨텍스트 정보 설정
      scope.setContext('Error', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });

      // Sentry에 에러 전송
      Sentry.captureException(sentryError);
    });

    // 에러를 상위로 전파
    throw sentryError;
  }
}
