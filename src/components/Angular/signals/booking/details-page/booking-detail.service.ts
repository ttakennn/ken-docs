import {
  AddBookinglistItem,
  BookinglistItem,
  EditBookinglistItem,
  RemoveBookinglistItem,
} from '@/app/shared/interfaces/bookinglist-item';
import { StorageService } from '@/app/shared/services/storage.service';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

export interface BookinglistItemsState {
  bookinglistItems: BookinglistItem[];
  loaded: boolean;
}

@Injectable({ providedIn: 'root' })
export class BookingDetailService {
  private storageService = inject(StorageService);

  // state
  private state = signal<BookinglistItemsState>({
    bookinglistItems: [],
    loaded: false,
  });

  // selectors
  bookinglistItems = computed(() => this.state().bookinglistItems);
  loaded = computed(() => this.state().loaded);

  // sources
  private bookinglistDetailsLoaded$ = this.storageService.loadBookingDetails();
  add$ = new Subject<AddBookinglistItem>();
  edit$ = new Subject<EditBookinglistItem>();
  remove$ = new Subject<RemoveBookinglistItem>();
  toggle$ = new Subject<RemoveBookinglistItem>();
  reset$ = new Subject<RemoveBookinglistItem>();

  constructor() {
    // reducers
    this.bookinglistDetailsLoaded$.pipe(takeUntilDestroyed()).subscribe((bookinglistItems) =>
      this.state.update((state) => ({
        ...state,
        bookinglistItems,
        loaded: true,
      })),
    );

    this.add$.pipe(takeUntilDestroyed()).subscribe((bookinglistItem) =>
      this.state.update((state) => ({
        ...state,
        bookinglistItems: [
          ...state.bookinglistItems,
          {
            ...bookinglistItem.item,
            id: Date.now().toString(),
            bookinglistId: bookinglistItem.bookinglistId,
            checked: false,
          },
        ],
      })),
    );

    this.edit$.pipe(takeUntilDestroyed()).subscribe((update) =>
      this.state.update((state) => ({
        ...state,
        bookinglistItems: state.bookinglistItems.map((item) =>
          item.id === update.id ? { ...item, title: update.data.title } : item,
        ),
      })),
    );

    this.remove$.pipe(takeUntilDestroyed()).subscribe((bookinglistId) =>
      this.state.update((state) => ({
        ...state,
        bookinglistItems: state.bookinglistItems.filter((item) => item.id !== bookinglistId),
      })),
    );

    this.toggle$.pipe(takeUntilDestroyed()).subscribe((bookinglistId) =>
      this.state.update((state) => ({
        ...state,
        bookinglistItems: state.bookinglistItems.map((item) =>
          item.id === bookinglistId ? { ...item, checked: !item.checked } : item,
        ),
      })),
    );

    this.reset$.pipe(takeUntilDestroyed()).subscribe((bookinglistId) =>
      this.state.update((state) => ({
        ...state,
        bookinglistItems: state.bookinglistItems.map((item) =>
          item.bookinglistId === bookinglistId ? { ...item, checked: false } : item,
        ),
      })),
    );

    // effects
    effect(() => {
      console.log('Loaded: ', this.loaded());

      if (this.loaded()) {
        console.log('Save booking details to Storage');
        this.storageService.saveBookinglistDetails(this.bookinglistItems());
      }
    });
  }
}
