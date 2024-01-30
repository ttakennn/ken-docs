import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '@/app/shared/services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, RouterLink, MatButtonModule],
  template: `
    <h1>Product List</h1>
    <button mat-raised-button color="primary" [routerLink]="'/products/12'">Navigate to Product Details</button>
  `,
})
export class ProductComponent {
  productService = inject(ProductService);
  router = inject(Router);
  http = inject(HttpClient);

  constructor() {
    console.log(this.productService.productList);
    console.log('----');
    this.getData().subscribe((reps) => {
      console.log(reps);
    });
  }

  getData() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10');
  }
}
