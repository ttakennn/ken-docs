import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserExternalService {
  httpClient = inject(HttpClient);

  loadUsers() {
    return of([{ id: 0, name: 'Ken', username: 'anhthai', email: 'dummy123@.com' }]);
  }

  loadUserWithId(id: number | string) {
    return of({ id: 0, name: 'Ken', username: 'anhthai', email: 'dummy123@.com' });
  }
}
