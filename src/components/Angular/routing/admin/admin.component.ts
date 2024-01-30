import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserListComponent } from '@/app/users/user-list.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, AsyncPipe, UserListComponent],
  template: `
    <h1>Admin Panel</h1>
    <div class="warn">This is protected page and it should be available only for users who has admin rights</div>

    <app-user-list></app-user-list>
  `,
  styles: `
    .warn {
      background-color: bisque;
      padding: 15px 8px;
      box-sizing: border-box;
      border-radius: 5px;
    }
  `,
})
export default class AdminComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
