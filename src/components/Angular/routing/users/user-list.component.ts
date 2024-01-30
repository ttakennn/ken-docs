import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '@/app/shared/services/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '@/app/shared/interfaces';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <h1>User list</h1>
    <ul class="user-list">
      <li class="user-card" *ngFor="let user of user$ | async">
        <div class="user-name">{{ user.name }}</div>
        <div>{{ user.email }} - <span (click)="onClick(user)" class="details">More details</span></div>
      </li>
    </ul>
  `,
  styles: `
    .user-card {
      padding: 10px 15px;
      border-radius: 5px;
      border: #c8d0ff 1px solid;
      margin-bottom: 5px;
    }

    .user-list {
      padding: 0;
      list-style: none;
    }

    .user-name {
      font-weight: bold;
      margin-bottom: 3px;
    }

    .details {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }
  `,
})
export class UserListComponent implements OnInit {
  router = inject(Router);
  userService = inject(UserService);
  user$!: Observable<User[]>;

  ngOnInit(): void {
    this.user$ = this.userService.loadUsers();
  }

  onClick(user: User) {
    this.router.navigate(['/users', user.id]).then(r => r);
  }
}
