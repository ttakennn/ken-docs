import { CommonModule } from "@angular/common";
import { Component, Injector, effect } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MainLayoutComponent } from "../main-layout/main-layout.component";
import { BookingComponent } from "./booking/booking.component";
import { CartComponent } from "./cart/cart.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

@Component({
  selector: "app-signals-feature",
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    MatButtonModule,
    MatTabsModule,
    TodoListComponent,
    UserProfileComponent,
    CartComponent,
    BookingComponent,
  ],
  template: `
    <app-main-layout>
      <ng-container title> Signals </ng-container>
      <ng-container container>
        <mat-tab-group>
          <mat-tab label="Todo List">
            <app-todo-list />
          </mat-tab>
          <mat-tab label="User Profile">
            <app-user-profile />
          </mat-tab>
          <mat-tab label="Cart Manager">
            <app-cart />
          </mat-tab>
          <mat-tab label="Booking">
            <app-booking />
          </mat-tab>
        </mat-tab-group>
      </ng-container>
    </app-main-layout>
  `,
})
export class SignalsFeatureComponent {
  constructor(private injector: Injector) {
    this.initializeLogging();
  }

  initializeLogging() {
    effect(
      () => {
        console.log(`Effect run`);
      },
      { injector: this.injector }
    );
  }
}
