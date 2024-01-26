import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-form-modal',
  template: `
    <header>
      <h2>{{ title }}</h2>
      <button mat-raised-button color="warn" (click)="close.emit()">Close</button>
    </header>
    <section>
      <form [formGroup]="formGroup" (ngSubmit)="save.emit(); close.emit()">
        @for (control of formGroup.controls | keyvalue; track control.key) {
        <div>
          <label [for]="control.key">{{ control.key }}</label>
          <input type="text" [id]="control.key" [formControlName]="control.key" />
        </div>
        }
        <button type="submit" mat-raised-button color="primary">Save</button>
      </form>
    </section>
  `,
  styles: [
    `
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

      form {
        padding: 1rem;
      }

      div {
        display: flex;
        flex-direction: column;

        label {
          margin-bottom: 1rem;
          font-weight: bold;
        }

        input {
          font-size: 1.5rem;
          padding: 10px;
        }
      }

      section button {
        margin-top: 1rem;
        width: 100%;
      }
    `,
  ],
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule],
})
export class FormModalComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) title!: string;

  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
