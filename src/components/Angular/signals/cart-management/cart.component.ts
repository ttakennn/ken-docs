import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MainLayoutComponent } from "../../main-layout/main-layout.component";
import { CartService } from "./cart.service";
import { simpleFaker, faker } from "@faker-js/faker";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, MatButtonModule, MatTabsModule],
  template: `
    <ng-container *ngFor="let cart of cartSignal.items">
      <div>ID Product: {{ cart.productId }}</div>
      <div>Product Name: {{ cart.productName }}</div>
      <div>Price: {{ cart.price }}</div>
      <div>quantity: {{ cart.quantity }}</div>
      <button
        mat-raised-button
        color="warn"
        (click)="removeCart(cart.productId)"
      >
        Remove
      </button>
      <hr />
    </ng-container>
    <div>Total: {{ cartSignal.totalAmount }}</div>
    <button mat-raised-button color="primary" (click)="addToCart()">
      Add Cart
    </button>
  `,
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
