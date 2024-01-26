import { MainLayoutComponent } from '@/app/main-layout/main-layout.component';
import { BookinglistService } from '@/app/shared/services/bookinglist.service';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BookingDetailService } from './booking-detail.service';
import { FormBuilder } from '@angular/forms';
import { BookinglistItem } from '@/app/shared/interfaces/bookinglist-item';
import { BookingDetailHeaderComponent } from './ui/booking-detail-header.component';
import { BookingDetailListingComponent } from './ui/booking-detail-listing.component';
import { ModalComponent } from '@/app/shared/components/moda.component';
import { FormModalComponent } from '@/app/shared/components/form-modal.component';

@Component({
  standalone: true,
  selector: 'app-booking-detail',
  template: `
    <app-main-layout>
      <ng-container title> Booking Details </ng-container>
      <ng-container container>
        @if (bookinglist(); as bookinglist) {
        <app-booking-detail-header
          [bookinglist]="bookinglist"
          (addItem)="bookinglistItemBeingEdited.set({})"
          (resetBookinglist)="bookingDetailService.reset$.next($event)"
        />
        }

        <app-booking-detail-listing
          [bookinglistItem]="items()"
          (delete)="bookingDetailService.remove$.next($event)"
          (edit)="bookinglistItemBeingEdited.set($event)"
          (toggle)="bookingDetailService.toggle$.next($event)"
        />

        <app-modal [isOpen]="!!bookinglistItemBeingEdited()">
          <ng-template>
            <app-form-modal
              title="Create item"
              [formGroup]="bookinglistItemForm"
              (save)="
                bookinglistItemBeingEdited()?.id ? bookingDetailService.edit$.next({
                  id: bookinglistItemBeingEdited()!.id!,
                  data: bookinglistItemForm.getRawValue(),
                })
                : bookingDetailService.add$.next({
                  item: bookinglistItemForm.getRawValue(),
                  bookinglistId: bookinglist()?.id!,
                })
              "
              (close)="bookinglistItemBeingEdited.set(null)"
            ></app-form-modal>
          </ng-template>
        </app-modal>
      </ng-container>
    </app-main-layout>
  `,
  imports: [
    CommonModule,
    MainLayoutComponent,
    BookingDetailHeaderComponent,
    BookingDetailListingComponent,
    ModalComponent,
    FormModalComponent,
  ],
})
export default class BookingDetailComponent {
  bookinglistService = inject(BookinglistService);
  bookingDetailService = inject(BookingDetailService);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  bookinglistItemBeingEdited = signal<Partial<BookinglistItem | null>>(null);
  params = toSignal(this.route.paramMap);

  items = computed(() =>
    this.bookingDetailService
      .bookinglistItems()
      .filter((item) => item.bookinglistId === this.params()?.get('id')),
  );

  bookinglist = computed(() =>
    this.bookinglistService
      .bookinglist()
      .find((bookinglist) => bookinglist.id === this.params()?.get('id')),
  );

  bookinglistItemForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      console.log('items: ', this.items());
      console.log('Params with id: ', this.params()?.get('id'));
      console.log('bookinglist: ', this.bookinglist());

      const bookinglistItem = this.bookinglistItemBeingEdited();

      if (!bookinglistItem) {
        this.bookinglistItemForm.reset();
      } else {
        this.bookinglistItemForm.patchValue({
          title: bookinglistItem.title,
        });
      }
    });
  }
}
