import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpClient = inject(HttpClient);

  loadUsers() {
    return this.httpClient.get<User[]>(`https://jsonplaceholder.typicode.com/users`);
  }

  loadUserWithId(id: number | string) {
    return this.httpClient.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }
}
