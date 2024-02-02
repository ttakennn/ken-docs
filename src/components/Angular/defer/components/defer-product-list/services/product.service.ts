import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import {
  PaginationProduct,
  Product,
} from '@/app/features/defer/components/defer-product-list/interface/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(page: number): Observable<PaginationProduct<Product>> {
    const url = `https://tta-js-post.onrender.com/api/products?_page=${page}&_limit=5`;
    return this.httpClient.get<PaginationProduct<Product>>(url).pipe(delay(1000));
  }
}
