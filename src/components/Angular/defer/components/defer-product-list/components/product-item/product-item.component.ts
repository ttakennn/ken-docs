import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '@/app/features/defer/components/defer-product-list/interface/product';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [JsonPipe, NgOptimizedImage, MatButtonModule],
  template: `
    <h1 [style.color]="product.color">{{ product.name }} - {{ product.price }}</h1>
    <img [alt]="product.name" [ngSrc]="product.thumbnailUrl" width="200" height="200" />
    <div [innerHTML]="product.description"></div>
  `,
})
export class ProductItemComponent implements OnInit {
  @Input({ required: true }) product!: Product;
  @Output() loaded = new EventEmitter<number>();

  ngOnInit(): void {
    console.log('ProductItemComponent: ', this.product);
    this.loaded.emit(this.product.uid);
  }
}
