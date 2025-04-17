import ShoppingCart from "./shoppingCart";

describe("ShoppingCart", () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe("addItem 메서드", () => {
    test("새 상품을 카트에 추가해야 함", () => {
      const item = { id: 1, name: "노트북", price: 1000000 };
      cart.addItem(item);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]).toEqual({
        id: 1,
        name: "노트북",
        price: 1000000,
        quantity: 1,
      });
    });

    test("이미 있는 상품의 수량을 증가시켜야 함", () => {
      const item = { id: 1, name: "노트북", price: 1000000 };
      cart.addItem(item);
      cart.addItem(item);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(2);
    });

    test("수량을 지정하여 상품을 추가할 수 있어야 함", () => {
      const item = { id: 1, name: "노트북", price: 1000000, quantity: 3 };
      cart.addItem(item);

      expect(cart.items[0].quantity).toBe(3);
    });
  });

  describe("removeItem 메서드", () => {
    beforeEach(() => {
      cart.addItem({ id: 1, name: "노트북", price: 1000000 });
      cart.addItem({ id: 2, name: "마우스", price: 30000 });
    });

    test("카트에서 상품을 제거해야 함", () => {
      cart.removeItem(1);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].id).toBe(2);
    });

    test("존재하지 않는 상품 ID로 제거해도 에러가 발생하지 않아야 함", () => {
      expect(() => cart.removeItem(999)).not.toThrow();
      expect(cart.items).toHaveLength(2);
    });
  });

  describe("updateQuantity 메서드", () => {
    beforeEach(() => {
      cart.addItem({ id: 1, name: "노트북", price: 1000000 });
    });

    test("상품 수량을 업데이트해야 함", () => {
      cart.updateQuantity(1, 5);
      expect(cart.items[0].quantity).toBe(5);
    });

    test("존재하지 않는 상품 ID로 업데이트해도 에러가 발생하지 않아야 함", () => {
      expect(() => cart.updateQuantity(999, 5)).not.toThrow();
    });
  });

  describe("getTotal 메서드", () => {
    test("빈 카트일 때 합계는 0이어야 함", () => {
      expect(cart.getTotal()).toBe(0);
    });

    test("카트 내 모든 상품의 가격 * 수량의 합계를 반환해야 함", () => {
      cart.addItem({ id: 1, name: "노트북", price: 1000000 });
      cart.addItem({ id: 2, name: "마우스", price: 30000, quantity: 2 });

      // 1000000 * 1 + 30000 * 2 = 1060000
      expect(cart.getTotal()).toBe(1060000);
    });
  });

  describe("clear 메서드", () => {
    test("카트를 비워야 함", () => {
      cart.addItem({ id: 1, name: "노트북", price: 1000000 });
      cart.addItem({ id: 2, name: "마우스", price: 30000 });

      cart.clear();

      expect(cart.items).toHaveLength(0);
      expect(cart.getTotal()).toBe(0);
    });
  });
});
