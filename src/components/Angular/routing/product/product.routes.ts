import { ProductComponent } from '@/app/product/product.component';
import { ProductDetailsComponent } from '@/app/product/product-details/product-details.component';
import { Routes } from '@angular/router';
import { ProductDetailGuard } from '@/app/product/services/ product-details.guard';

export const PRODUCT_ROUTES: Routes = [
  { path: '', component: ProductComponent },
  {
    path: ':id',
    canActivate: [ProductDetailGuard],
    component: ProductDetailsComponent,
  },
];
