import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faker } from '@faker-js/faker';
import { MatButtonModule } from '@angular/material/button';
import {
  UserSignalStateService,
  UserState,
} from '@/app/features/signals-feature/signals-store/services/user-signal-state.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  selector: 'app-change-name',
  template: `
    <div class="flex-col">
      <button mat-raised-button color="primary" (click)="changeName()">Change Name</button>
      <div class="mt-4">
        <p class="text-indigo-600 font-semibold mb-0">Current:</p>
        <p>{{ name() }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeNameComponent {
  userSignalsStateService = inject(UserSignalStateService);

  name = this.userSignalsStateService.select('name');

  changeName() {
    const newName = faker.person.fullName();
    this.userSignalsStateService.setState({ name: newName } as UserState);
  }
}
