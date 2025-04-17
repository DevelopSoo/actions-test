class Cart {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[] = [];

  constructor() {
    this.items = [];
  }

  addItem(item: { id: string; name: string; price: number; quantity: number }) {
    // 만약 이미 존재하는 아이템이라면 수량을 추가한다.
    const existingItem = this.items.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  removeItem(itemId: string) {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  updateQuantity(itemId: string, quantity: number) {
    if (quantity < 1) {
      throw new Error("수량은 1보다 작을 수 없습니다.");
    }

    const item = this.items.find((i) => i.id === itemId);

    if (!item) {
      throw new Error("존재하지 않는 상품입니다.");
    }

    item.quantity = quantity;
  }

  getTotalPrice() {
    return this.items.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);
  }

  clear() {
    this.items = [];
  }
}

export default Cart;
