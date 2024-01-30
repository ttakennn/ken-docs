import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UserSignalStateService } from '@/app/features/signals-feature/signals-store/services/user-signal-state.service';
import { CommonModule } from '@angular/common';
import { PageContentComponent } from '@/app/features/signals-feature/signals-store/shared-ui/page-content.component';
import { ChangeNameComponent } from '@/app/features/signals-feature/signals-store/components/change-name.component';
import { ChangeCompanyComponent } from '@/app/features/signals-feature/signals-store/components/change-company.component';
import { ChangeAddressComponent } from '@/app/features/signals-feature/signals-store/components/change-address.component';
import { faker } from '@faker-js/faker';

@Component({
  standalone: true,
  selector: 'app-signals-store',
  imports: [CommonModule, PageContentComponent, ChangeNameComponent, ChangeCompanyComponent, ChangeAddressComponent],
  template: `
    <ui-page-content title="Signals (Simple Store)">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex gap-16">
          <div class="flex-col gap-32 h-full">
            <div class="h-full w-48 p-2 mt-5 border-purple-500 border-dashed border-2">
              <p class="text-center">Component 1</p>
              <app-change-name class="flex justify-center"></app-change-name>
            </div>
            <div class="h-full w-48 p-2 mt-5 border-purple-500 border-dashed border-2">
              <p class="text-center">Component 2</p>
              <app-change-company class="flex justify-center"></app-change-company>
            </div>
            <div class="h-full w-48 p-2 mt-5 border-purple-500 border-dashed border-2">
              <p class="text-center">Component 3</p>
              <app-change-address class="flex justify-center"></app-change-address>
            </div>
          </div>
          <div class="flex w-full">
            <div class="flex-col h-full p-2 mt-5 w-3/4 border-purple-500 border-dashed border-2">
              <div>
                <p class="text-2xl">Current State</p>
              </div>
              <div class="flex-col mt-5">
                <p class="text-indigo-600 font-semibold">
                  Name: <span class="text-black font-normal">{{ user().name }}</span>
                </p>
                <p class="text-indigo-600 font-semibold">
                  Company:<span class="text-black font-normal">{{ user().company }}</span>
                </p>
                <p class="text-indigo-600 font-semibold">
                  Address: <span class="text-black font-normal">{{ user().address }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ui-page-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserSignalStateService],
})
export class SignalsStoreComponent implements OnInit {
  userSignalsStateService = inject(UserSignalStateService);

  readonly user = this.userSignalsStateService.state.asReadonly();

  ngOnInit(): void {
    this.userSignalsStateService.setState({
      address: faker.location.streetAddress(),
      name: faker.person.fullName(),
      company: faker.company.name(),
    });
  }
}
