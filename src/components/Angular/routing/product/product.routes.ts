import { ProductComponent } from '@/app/product/product.component';
import { ProductDetailsComponent } from '@/app/product/product-details/product-details.component';
import { Routes } from '@angular/router';
import { ProductDetailGuard } from '@/app/product/services/ product-details.guard';
import { ProductChildrenComponent } from '@/app/product/product-children.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductComponent,
    // product children
    children: [
      {
        path: 'children',
        component: ProductChildrenComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: ':id',
    canActivate: [ProductDetailGuard],
    component: ProductDetailsComponent,
  },
];
