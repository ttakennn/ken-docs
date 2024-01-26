import {
  AddBookinglist,
  Bookinglist,
  EditBookinglist,
  RemoveBookinglist,
} from '@/app/shared/interfaces/bookinglist';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';

export interface BookinglistState {
  bookinglist: Bookinglist[];
  loaded: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class BookinglistService {
  private storageService = inject(StorageService);

  // state
  private state = signal<BookinglistState>({
    bookinglist: [],
    loaded: false,
    error: null,
  });

  // selectors
  bookinglist = computed(() => this.state().bookinglist);
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);

  // sources
  private bookinglistLoaded$ = this.storageService.loadBookinglists();
  add$ = new Subject<AddBookinglist>();
  edit$ = new Subject<EditBookinglist>();
  remove$ = new Subject<RemoveBookinglist>();

  constructor() {
    // reducers
    this.bookinglistLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (bookinglist) =>
        this.state.update((state) => ({
          ...state,
          bookinglist,
          loaded: true,
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });

    this.add$.pipe(takeUntilDestroyed()).subscribe((bookinglist) => {
      console.log('Add: ', bookinglist);
      this.state.update((state) => ({
        ...state,
        bookinglist: [...state.bookinglist, this.addIdToBookinglist(bookinglist)],
      }));
    });

    this.edit$.pipe(takeUntilDestroyed()).subscribe((update) => {
      console.log('Edit: ', update);
      this.state.update((state) => ({
        ...state,
        bookinglist: state.bookinglist.map((bookinglist) =>
          bookinglist.id === update.id ? { ...bookinglist, title: update.data.title } : bookinglist,
        ),
      }));
    });

    this.remove$.pipe(takeUntilDestroyed()).subscribe((id) => {
      this.state.update((state) => ({
        ...state,
        bookinglist: state.bookinglist.filter((item) => item.id !== id),
      }));
    });

    // effects
    effect(() => {
      console.log('Loaded: ', this.loaded());

      if (this.loaded()) {
        console.log('Save booking lists to Storage');
        this.storageService.saveBookingLists(this.bookinglist());
      }
    });
  }

  private addIdToBookinglist(bookinglist: AddBookinglist) {
    return {
      ...bookinglist,
      id: this.generateSlug(bookinglist.title),
    };
  }

  private generateSlug(title: string) {
    // NOTE: This is a simplistic slug generator and will not handle things like special characters.
    let slug = title.toLowerCase().replace(/\s+/g, '-');

    // Check if the slug already exists
    const matchingSlugs = this.bookinglist().find((bookinglist) => bookinglist.id === slug);

    // If the title is already being used, add a string to make the slug unique
    if (matchingSlugs) {
      slug = slug + Date.now().toString();
    }

    return slug;
  }
}
