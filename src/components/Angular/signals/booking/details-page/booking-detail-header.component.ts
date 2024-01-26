import { Bookinglist } from '@/app/shared/interfaces/bookinglist';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-booking-detail-header',
  template: `
    <header>
      <button routerLink="/signals" mat-raised-button color="primary">Back</button>
      <h1>
        {{ bookinglist.title }}
      </h1>
      <div>
        <button mat-raised-button color="warn" (click)="resetBookinglist.emit(bookinglist.id)">
          Reset
        </button>
        <button mat-raised-button color="primary" (click)="addItem.emit()">Add Item</button>
      </div>
    </header>
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
      margin-left: 1rem;
    }
  `,
  imports: [RouterModule, MatButtonModule],
})
export class BookingDetailHeaderComponent {
  @Input({ required: true }) bookinglist!: Bookinglist;

  @Output() addItem = new EventEmitter<void>();
  @Output() resetBookinglist = new EventEmitter<string>();
}
