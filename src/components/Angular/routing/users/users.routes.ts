import { Routes } from '@angular/router';
import { UserListComponent } from '@/app/users/user-list.component';
import { UserComponent } from '@/app/users/user.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: ':id',
    component: UserComponent,
  },
];
