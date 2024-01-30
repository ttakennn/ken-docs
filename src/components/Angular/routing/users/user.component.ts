import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '@/app/shared/services/user.service';
import { map, Observable, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '@/app/shared/interfaces';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, AsyncPipe, MatButtonModule, RouterLink],
  template: `
    <h4>User Details -- <a mat-stroked-button class="back" routerLink="/users">Back to Users</a></h4>
    <section class="user-card" *ngIf="user$ | async as user">
      <div class="user-card-row">
        <span class="label">User id: </span>
        <span class="value">{{ user.id }}</span>
      </div>
      <div class="user-card-row">
        <span class="label">User Name: </span>
        <span class="value">{{ user.name }}</span>
      </div>
      <div class="user-card-row">
        <span class="label">User Email: </span>
        <span class="value">{{ user.email }}</span>
      </div>
    </section>
  `,
  styles: `
    .back {
      margin-bottom: 10px;
    }

    .user-card-row {
      border-bottom: 1px dotted #ccc;
      padding: 3px 10px;
    }

    .label {
      opacity: 0.7;
      font-size: 14px;
      margin-right: 10px;
      min-width: 100px;
      display: inline-block;
    }

    .value {
      font-weight: 700;
    }
  `,
})
export class UserComponent implements OnInit {
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  user$!: Observable<User>;

  ngOnInit(): void {
    this.user$ = this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap(id => this.userService.loadUserWithId(id)),
    );
  }
}
