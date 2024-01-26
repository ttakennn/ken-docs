export interface Bookinglist {
  id: string;
  title: string;
}

export type AddBookinglist = Omit<Bookinglist, 'id'>;

export type EditBookinglist = { id: Bookinglist['id']; data: AddBookinglist };

export type RemoveBookinglist = Bookinglist['id'];
