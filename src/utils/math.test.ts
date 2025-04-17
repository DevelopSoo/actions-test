// import * as math from "./math";

// test("모듈의 함수들이 Mock으로 대체되었는지 확인", () => {
//   expect(math.add(1, 2)).toBe(3);
// });

// 복잡한 조건문이 있는 함수
function calculateDiscount(order: {
  total: number;
  userLevel: string;
  promoCode: string;
}) {
  let discount = 0;

  // 주문 총액에 따른 할인
  if (order.total >= 10000) {
    discount += order.total * 0.1; // 10% 할인
  } else if (order.total >= 5000) {
    discount += order.total * 0.05; // 5% 할인
  }

  // 회원 등급에 따른 추가 할인
  if (order.userLevel === "gold") {
    discount += order.total * 0.05; // 추가 5% 할인
  } else if (order.userLevel === "silver") {
    discount += order.total * 0.02; // 추가 2% 할인
  }

  if (order.promoCode === "SPECIAL") {
    discount += 1000; // 1000원 추가 할인
  }

  // 최대 할인 금액 제한
  return Math.min(discount, order.total * 0.3); // 최대 30%까지 할인
}

// 테스트 케이스 매트릭스 사용
describe("calculateDiscount 함수", () => {
  // 요소별 테스트
  describe("주문 총액 기준 할인", () => {
    test("10,000원 이상 주문 시 10% 할인", () => {
      const order = { total: 10000, userLevel: "basic", promoCode: "" };
      expect(calculateDiscount(order)).toBe(1000); // 10,000 * 0.1
    });

    test("5,000원 이상 10,000원 미만 주문 시 5% 할인", () => {
      const order = { total: 5000, userLevel: "basic", promoCode: "" };
      expect(calculateDiscount(order)).toBe(250); // 5,000 * 0.05
    });

    test("5,000원 미만 주문 시 할인 없음", () => {
      const order = { total: 3000, userLevel: "basic", promoCode: "" };
      expect(calculateDiscount(order)).toBe(0);
    });
  });

  describe("회원 등급 기준 할인", () => {
    test("골드 회원은 추가 5% 할인", () => {
      const order = { total: 10000, userLevel: "gold", promoCode: "" };
      expect(calculateDiscount(order)).toBe(1500); // (10,000 * 0.1) + (10,000 * 0.05)
    });

    test("실버 회원은 추가 2% 할인", () => {
      const order = { total: 10000, userLevel: "silver", promoCode: "" };
      expect(calculateDiscount(order)).toBe(1200); // (10,000 * 0.1) + (10,000 * 0.02)
    });
  });

  describe("프로모션 코드 할인", () => {
    test("유효한 프로모션 코드로 1,000원 추가 할인", () => {
      const order = { total: 5000, userLevel: "basic", promoCode: "SPECIAL" };
      expect(calculateDiscount(order)).toBe(1250); // (5,000 * 0.05) + 1000
    });
  });

  describe("최대 할인 제한", () => {
    test("할인은 주문 금액의 30%를 초과할 수 없음", () => {
      // 골드 회원 + 프로모션 코드로 최대 할인 초과 시도
      const order = {
        total: 5000,
        userLevel: "gold",
        promoCode: "SPECIAL",
      };

      // 계산된 할인: (5,000 * 0.05) + (5,000 * 0.05) + 1000 = 1500// 최대 할인: 5,000 * 0.3 = 1500
      expect(calculateDiscount(order)).toBe(1500);
    });
  });

  // 조합 테스트 (여러 조건 동시 적용)
  test.each([
    // [총액, 회원등급, 프로모코드, 예상할인]
    [3000, "basic", "", 0],
    [5000, "basic", "", 250],
    [10000, "basic", "", 1000],
    [5000, "silver", "", 350], // (5000 * 0.05) + (5000 * 0.02)
    [5000, "gold", "", 500], // (5000 * 0.05) + (5000 * 0.05)
    [3000, "basic", "SPECIAL", 900], // 최대 할인은 30%까지만 가능하므로 900원까지만 가능
    [10000, "gold", "SPECIAL", 2500], // (10000 * 0.1) + (10000 * 0.05) + 1000
  ])(
    '주문(%i원, %s, "%s") => %i원 할인',
    (total, userLevel, promoCode, expectedDiscount) => {
      const order = { total, userLevel, promoCode };

      expect(calculateDiscount(order)).toBe(expectedDiscount);
    }
  );
});
