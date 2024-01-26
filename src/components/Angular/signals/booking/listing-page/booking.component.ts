import { MainLayoutComponent } from '@/app/main-layout/main-layout.component';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ModalComponent } from '@/app/shared/components/moda.component';
import { BookinglistService } from '@/app/shared/services/bookinglist.service';
import { Bookinglist } from '@/app/shared/interfaces/bookinglist';
import { BookinglistComponent } from './ui/bookinglist-list.component';
import { FormModalComponent } from '@/app/shared/components/form-modal.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    MatButtonModule,
    MatTabsModule,
    BookinglistComponent,
    ModalComponent,
    FormModalComponent,
  ],
  template: `
    <header>
      <h1>Booking List</h1>
      <button mat-raised-button color="primary" (click)="bookinglistBeingEdited.set({})">Add Booking</button>
    </header>

    <section>
      <h2>Your Booking</h2>

      <app-bookinglist
        [bookinglist]="bookinglistService.bookinglist()"
        (edit)="bookinglistBeingEdited.set($event)"
        (delete)="bookinglistService.remove$.next($event)"
      />
    </section>

    <app-modal [isOpen]="!!bookinglistBeingEdited()">
      <ng-template>
        <app-form-modal
          [formGroup]="bookinglistForm"
          [title]="bookinglistBeingEdited()?.title ? bookinglistBeingEdited()!.title! : 'Add Booking'"
          (save)="
            bookinglistBeingEdited()?.id
              ? bookinglistService.edit$.next({
                  id: bookinglistBeingEdited()!.id!,
                  data: bookinglistForm.getRawValue()
                })
              : bookinglistService.add$.next(bookinglistForm.getRawValue())
          "
          (close)="bookinglistBeingEdited.set(null)"
        >
        </app-form-modal>
      </ng-template>
    </app-modal>
  `,
  styles: `
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem;
      background: var(--color-light);
    }

    section {
      height: 100%;
      padding: 2rem;
      background: var(--color-primary);
    }

    button {
      height: 30px;
    }
  `,
})
export class BookingComponent {
  formBuilder = inject(FormBuilder);
  bookinglistService = inject(BookinglistService);

  bookinglistBeingEdited = signal<Partial<Bookinglist> | null>(null);

  bookinglistForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      const checkList = this.bookinglistBeingEdited();
      console.log('CheckList effect: ', checkList);

      if (!checkList) {
        this.bookinglistForm.reset();
      } else {
        this.bookinglistForm.patchValue({
          title: checkList.title,
        });
      }
    });
  }
}
