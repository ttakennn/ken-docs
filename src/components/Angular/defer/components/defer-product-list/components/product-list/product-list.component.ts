import { Component, signal } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { Product } from '@/app/features/defer/components/defer-product-list/interface/product';
import { ProductItemComponent } from '@/app/features/defer/components/defer-product-list/components/product-item/product-item.component';
import { ProductService } from '@/app/features/defer/components/defer-product-list/services/product.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [JsonPipe, ProductItemComponent, MatButton, NgIf],
  template: `
    @for (product of products(); track product.uid) {
      @defer (on viewport; prefetch on idle) {
        <app-product-item [product]="product" (loaded)="loaded($event)" />
      } @loading {
        <div class="flex flex-col gap-4 p-4 w-96">
          <div
            class="w-full h-64 rounded-md overflow-hidden border-2 border-gray-300 bg-gray-200"
          ></div>
        </div>
      } @placeholder {
        <div class="flex flex-col gap-4 p-4 w-96">
          <div
            class="w-full h-64 rounded-md overflow-hidden border-2 border-gray-300 bg-gray-200"
          ></div>
        </div>
      }
    }
  `,
})
export class DeferProductListComponent {
  protected readonly products = signal<Product[]>([]);
  private total = 0;

  constructor(private readonly productService: ProductService) {
    this.loadProducts(1);
  }

  private loadProducts(page: number) {
    this.productService.getProducts(page).subscribe((products) => {
      console.log('List Products: ', products);
      this.total = products.pagination._totalRows;

      this.products.update((oldProducts) => {
        return [...oldProducts, ...products.data];
      });
    });
  }

  loaded(id: number) {
    console.log('Matched ID: ', this.products().at(-1)?.uid);
    if (this.products().length < this.total && this.products().at(-1)?.uid === id) {
      this.loadProducts(Math.ceil(this.products().length / 5) + 1);
    }
  }
}
