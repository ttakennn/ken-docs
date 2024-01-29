import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@/app/shared/services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  template: `<p>Product details with id: {{ id }}</p> `,
})
export class ProductDetailsComponent {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.id = Number(this.route.snapshot.paramMap.get('id') || 0);
    console.log(`Product Details with id: ${this.id}`);

    console.log('Product Details', this.productService.productList);
  }
}
