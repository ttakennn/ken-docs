import { Injectable, InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { of } from 'rxjs';
import { Bookinglist } from '../interfaces/bookinglist';
import { BookinglistItem } from '../interfaces/bookinglist-item';

export const LOCAL_STORAGE = new InjectionToken<Storage>('window local storage object', {
  providedIn: 'root',
  factory: () => {
    return inject(PLATFORM_ID) === 'browser' ? window.localStorage : ({} as Storage);
  },
});

@Injectable({ providedIn: 'root' })
export class StorageService {
  storage = inject(LOCAL_STORAGE);

  loadBookinglists() {
    const bookinglist = this.storage.getItem('bookinglists');
    return of(bookinglist ? (JSON.parse(bookinglist) as Bookinglist[]) : []);
  }

  loadBookingDetails() {
    const bookinglistDetails = this.storage.getItem('bookinglistDetails');
    return of(bookinglistDetails ? (JSON.parse(bookinglistDetails) as BookinglistItem[]) : []);
  }

  saveBookingLists(bookinglists: Bookinglist[]) {
    this.storage.setItem('bookinglists', JSON.stringify(bookinglists));
  }

  saveBookinglistDetails(bookinglistDetails: BookinglistItem[]) {
    this.storage.setItem('bookinglistDetails', JSON.stringify(bookinglistDetails));
  }
}
