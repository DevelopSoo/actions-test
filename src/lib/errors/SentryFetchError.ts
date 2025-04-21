// Sentry 에러 추적을 위한 커스텀 에러 클래스
// JavaScript의 기본 Error 클래스를 상속받아 확장
export class SentryFetchError extends Error {
  // URL과 HTTP 상태 코드를 받아 에러 메시지를 생성하는 private static 메서드
  // private: 클래스 내부에서만 접근 가능
  // static: 인스턴스 생성 없이 클래스에서 직접 호출 가능
  private static generateName(url: string, status: number): string {
    // 입력받은 URL 문자열을 URL 객체로 파싱하여 각 구성 요소에 접근할 수 있게 함
    const parsedUrl = new URL(url);

    // URL의 프로토콜(http:// 또는 https://)과 호스트(도메인) 부분을 조합하여 기본 URL 생성
    const baseURL = `${parsedUrl.protocol}//${parsedUrl.host}`;

    // URL의 경로 부분 추출
    const pathname = parsedUrl.pathname;

    // 정규식을 사용하여 URL 경로에서 숫자로 된 ID 부분을 {id}로 대체
    // 예: /users/123/posts/456 -> /users/{id}/posts/{id}
    const replacePathParams = pathname.replace(/\/\d+(?=\/|$)/g, '/{id}');

    // 최종 에러 메시지 생성 및 반환
    // 형식: [상태코드 Error] - 기본URL/경로
    // 예: [404 Error] - https://api.example.com/users/{id}
    return `[${status} Error] - ${baseURL}${replacePathParams}`;
  }

  // HTTP 응답 객체를 저장하는 선택적(optional) 프로퍼티
  public response?: Response;
  // HTTP 요청 객체를 저장하는 프로퍼티
  public request: Request;
  // 요청 URL을 저장하는 프로퍼티
  public url: string;
  // HTTP 상태 코드를 저장하는 선택적(optional) 프로퍼티
  public status?: number;

  // 생성자: HTTP 요청과 응답 객체를 받아 에러 인스턴스를 초기화
  constructor(request: Request, response?: Response) {
    // 응답이 있는 경우 해당 상태 코드를, 없는 경우 0을 사용
    const status = response?.status || 0;
    // 응답이 있는 경우 해당 상태 텍스트를, 없는 경우 'Network Error'를 사용
    const statusText = response?.statusText || 'Network Error';
    // 에러 메시지 생성
    const message = `Request failed with status code ${status}: ${statusText}`;

    // 부모 클래스(Error)의 생성자 호출
    super(message);

    // 에러 이름 설정
    // 응답이 있는 경우 generateName 메서드를 사용하여 생성
    // 응답이 없는 경우 네트워크 에러 형식으로 설정
    this.name = response
      ? SentryFetchError.generateName(request.url, status)
      : `[Network Error] - ${request.url}`;

    // 클래스 프로퍼티들 초기화 -> 생성된 인스턴스에서 호출 가능
    // console.log(e.request.method)
    this.request = request;
    this.response = response;
    this.url = request.url;
    this.status = response?.status;
  }
}
