// fetchData.ts
export function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("프로미스 반환값");
    }, 1000);
  });
}

export function fetchDataCallback(callback: (data: string) => void) {
  setTimeout(() => {
    // callback 함수를 받으면 자동으로 "콜백 인자"라는 인자를 전달한다.
    callback("콜백 인자");
  }, 1000);
}
