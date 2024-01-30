import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignalsFeatureComponent } from './signals-feature/signals-feature.component';
import { UserService } from '@/app/shared/services/user.service';
import { UserExternalService } from '@/app/shared/services/user-external.service';

export const routes: Routes = [
  { path: 'home', title: 'Home', component: HomeComponent },
  {
    path: 'products',
    loadChildren: () => import('./product/product.routes').then((r) => r.PRODUCT_ROUTES),
  },
  //highlight-start
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes').then((r) => r.USER_ROUTES),
    providers: [{ provide: UserService, useExisting: UserExternalService }],
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component'), // need to export default class
  },
  //highlight-end
  { path: 'about', title: 'About', component: AboutComponent },
  { path: 'contact', title: 'Contact', component: ContactComponent },
  { path: 'signals', title: 'Signals', component: SignalsFeatureComponent },
  {
    path: 'booking-detail/:id',
    loadComponent: () => import('./signals-feature/booking-detail/booking-detail.component'),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
