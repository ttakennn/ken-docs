import { RemoveBookinglist } from './bookinglist';

export interface BookinglistItem {
  id: string;
  bookinglistId: string;
  title: string;
  checked: boolean;
}

export type AddBookinglistItem = {
  item: Omit<BookinglistItem, 'id' | 'bookinglistId' | 'checked'>;
  bookinglistId: RemoveBookinglist;
};

export type EditBookinglistItem = {
  id: BookinglistItem['id'];
  data: AddBookinglistItem['item'];
};

export type RemoveBookinglistItem = BookinglistItem['id'];
