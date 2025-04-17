import { fetchDataCallback } from "./fetchData";

test("콜백으로 데이터 가져오기 테스트", (done) => {
  function callback(data: string) {
    try {
      expect(data).toBe("콜백 인자");
      done(); // 테스트 완료를 알림
    } catch (error) {
      done(error); // 에러가 발생하면 테스트를 실패시킴
    }
  }

  fetchDataCallback(callback);
});
