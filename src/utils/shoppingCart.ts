type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Item = {
  id: number;
  name: string;
  price: number;
  quantity?: number;
};

class ShoppingCart {
  items: CartItem[];

  constructor() {
    this.items = [];
  }

  addItem(item: Item) {
    const existingItem = this.items.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      this.items.push({
        ...item,
        quantity: item.quantity || 1,
      });
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.quantity = quantity;
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  clear() {
    this.items = [];
  }
}

export default ShoppingCart;
