import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MainLayoutComponent } from '../../main-layout/main-layout.component';
import { CartService } from './cart.service';
import { simpleFaker, faker } from '@faker-js/faker';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, MatButtonModule, MatTabsModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  cartService = inject(CartService);
  cartSignal = this.cartService.cart();

  addToCart() {
    const cartItems = {
      productId: simpleFaker.string.uuid(),
      productName: faker.commerce.product(),
      price: Number(faker.commerce.price()),
      quantity: Number(faker.number.int(100)),
    };
    this.cartService.addItem(cartItems);
  }

  removeCart(productId: string) {
    this.cartService.removeItem(productId);
  }
}
