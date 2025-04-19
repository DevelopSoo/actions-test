import Cart from './cart';

const ITEMS = {
  laptop: { id: 'item1', name: '노트북', price: 1000000, quantity: 1 },
  mouse: { id: 'item2', name: '마우스', price: 30000, quantity: 1 },
};

const createCartWithItems = (
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[] = []
) => {
  const cart = new Cart();
  items.forEach((item) => cart.addItem({ ...item }));
  return cart;
};

describe('장바구니 기능 테스트', () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  describe('상품 추가', () => {
    test('새로운 상품을 장바구니에 추가하면 해당 상품이 목록에 포함된다', () => {
      const laptop = { ...ITEMS.laptop };
      cart.addItem(laptop);
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]).toEqual(laptop);
    });

    test('같은 상품을 추가하면 수량이 증가한다', () => {
      const laptop = { ...ITEMS.laptop };
      cart.addItem(laptop);
      cart.addItem(laptop);
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(2);
    });
  });

  describe('상품 제거', () => {
    test('특정 상품을 제거하면 해당 상품이 장바구니에서 사라진다', () => {
      cart = createCartWithItems([{ ...ITEMS.laptop }, { ...ITEMS.mouse }]);
      cart.removeItem(ITEMS.laptop.id);
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]).toEqual({ ...ITEMS.mouse });
    });
  });

  describe('수량 변경', () => {
    test('상품의 수량을 변경하면 해당 수량이 반영된다', () => {
      cart.addItem({ ...ITEMS.laptop });
      cart.updateQuantity(ITEMS.laptop.id, 3);
      expect(cart.items[0].quantity).toBe(3);
    });

    test('수량을 1보다 작게 변경하면 에러가 발생한다', () => {
      cart.addItem({ ...ITEMS.laptop });
      expect(() => cart.updateQuantity(ITEMS.laptop.id, 0)).toThrowError(
        new Error('수량은 1보다 작을 수 없습니다.')
      );
    });

    test('존재하지 않는 상품의 수량을 변경하면 에러가 발생한다', () => {
      cart.addItem({ ...ITEMS.laptop });
      expect(() => cart.updateQuantity('item999', 3)).toThrowError(
        new Error('존재하지 않는 상품입니다.')
      );
    });
  });

  describe('총 금액 계산', () => {
    test('장바구니에 여러 상품이 있을 때 총 금액을 정확히 계산한다', () => {
      cart = createCartWithItems([
        { ...ITEMS.laptop },
        { ...ITEMS.mouse, quantity: 2 },
      ]);
      expect(cart.getTotalPrice()).toBe(1000000 + 30000 * 2);
    });
  });

  describe('장바구니 비우기', () => {
    test('장바구니를 비우면 모든 상품이 제거되고 총 금액이 0이 된다', () => {
      cart = createCartWithItems([{ ...ITEMS.laptop }, { ...ITEMS.mouse }]);
      cart.clear();
      expect(cart.items).toHaveLength(0);
      expect(cart.getTotalPrice()).toBe(0);
    });
  });
});
