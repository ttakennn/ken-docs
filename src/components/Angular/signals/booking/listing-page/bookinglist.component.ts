import { Bookinglist } from '@/app/shared/interfaces/bookinglist';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-bookinglist',
  template: `
    <ul>
      {{
        bookinglist | json
      }}
      @for (book of bookinglist; track book.id) {
      <li>
        <a routerLink="/booking-detail/{{ book.id }}">
          {{ book.title }}
        </a>
        <div>
          <button mat-raised-button color="primary" (click)="edit.emit(book)">Edit</button>
          <button mat-raised-button color="warn" (click)="delete.emit(book.id)">Delete</button>
        </div>
      </li>
      } @empty {
      <p>Check the add button to create your booking</p>
      }
    </ul>
  `,
  styles: `
    a {
      text-decoration: underline;
      color: blue;
    }

    ul {
      padding: 0;
      margin: 0;
    }

    li {
      font-size: 1.5em;
      display: flex;
      justify-content: space-between;
      background: var(--color-light);
      list-style-type: none;
      margin-bottom: 1rem;
      padding: 1rem;

      button {
        margin-left: 1rem;
      }
    }
  `,
  imports: [CommonModule, RouterModule, MatButtonModule],
})
export class BookinglistComponent {
  @Input({ required: true }) bookinglist!: Bookinglist[];
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Bookinglist>();
}
