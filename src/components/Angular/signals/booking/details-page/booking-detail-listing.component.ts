import { BookinglistItem } from '@/app/shared/interfaces/bookinglist-item';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-booking-detail-listing',
  template: `
    <section>
      <ul>
        {{
          bookinglistItem | json
        }}
        @for(item of bookinglistItem; track item.id) {
        <li>
          <div>
            @if (item.checked) {
            <span>✅</span>
            }
            {{ item.title }}
          </div>
          <div>
            <button (click)="toggle.emit(item.id)" mat-raised-button color="primary">Toggle</button>
            <button (click)="edit.emit(item)" mat-raised-button color="primary">Edit</button>
            <button (click)="delete.emit(item.id)" mat-raised-button color="warn">Delete</button>
          </div>
        </li>
        } @empty {
        <div>
          <h2>Add an item</h2>
          <p>Click the add button to add your first item to this quicklist</p>
        </div>
        }
      </ul>
    </section>
  `,
  styles: `
      section {
        height: 100%;
        padding: 2rem;
        background: var(--color-primary);
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
export class BookingDetailListingComponent {
  @Input({ required: true }) bookinglistItem!: BookinglistItem[];

  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<BookinglistItem>();
  @Output() toggle = new EventEmitter<string>();
}
