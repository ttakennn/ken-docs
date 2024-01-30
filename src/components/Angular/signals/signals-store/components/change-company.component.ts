import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UserSignalStateService,
  UserState,
} from '@/app/features/signals-feature/signals-store/services/user-signal-state.service';
import { faker } from '@faker-js/faker';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  selector: 'app-change-company',
  template: `
    <div class="flex-col">
      <button mat-raised-button color="primary" (click)="changeCompany()">Change Company</button>
      <div class="mt-4">
        <p class="text-indigo-600 font-semibold mb-0">Current:</p>
        <p>{{ company() }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeCompanyComponent {
  userSignalsStateService = inject(UserSignalStateService);

  company = this.userSignalsStateService.select('company');

  changeCompany() {
    const newCompany = faker.company.name();
    this.userSignalsStateService.setState({ company: newCompany } as UserState);
  }
}
