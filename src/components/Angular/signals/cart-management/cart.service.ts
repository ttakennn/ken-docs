import { Injectable, signal } from "@angular/core";

interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

interface ShoppingCart {
  items: CartItem[];
  totalAmount: number;
}

@Injectable({ providedIn: "root" })
export class CartService {
  cart = signal<ShoppingCart>({
    items: [],
    totalAmount: 0,
  });

  addItem(item: CartItem) {
    this.cart.update((currentCart: ShoppingCart) => {
      const existingItemIdx = currentCart.items.findIndex(
        (i) => i.productId === item.productId
      );
      if (existingItemIdx !== -1) {
        currentCart.items[existingItemIdx].quantity += item.quantity;
      } else {
        currentCart.items.push(item);
      }

      currentCart.totalAmount += item.price * item.quantity;

      return currentCart;
    });
  }

  removeItem(productId: string) {
    this.cart.update((currentCart) => {
      const itemIndex = currentCart.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex !== -1) {
        const item = currentCart.items[itemIndex];
        currentCart.totalAmount -= item.price * item.quantity;
        currentCart.items.splice(itemIndex, 1);
      }

      return currentCart;
    });
  }
}
