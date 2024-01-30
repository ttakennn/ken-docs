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
  selector: 'app-change-address',
  template: `
    <div class="flex-col">
      <button mat-raised-button color="primary" (click)="changeAddress()">Change Address</button>
      <div class="mt-4">
        <p class="text-indigo-600 font-semibold mb-0">Current:</p>
        <p>{{ address() }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeAddressComponent {
  userSignalsStateService = inject(UserSignalStateService);

  address = this.userSignalsStateService.select('address');

  changeAddress() {
    const newAddress = faker.location.streetAddress({ useFullAddress: true });
    this.userSignalsStateService.setState({ address: newAddress } as UserState);
  }
}
