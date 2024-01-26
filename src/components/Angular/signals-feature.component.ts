import { CommonModule } from "@angular/common";
import {
  Component,
  Injector,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MainLayoutComponent } from "../main-layout/main-layout.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { CartComponent } from "./cart/cart.component";
import { BookingComponent } from "./booking/booking.component";

@Component({
  selector: "app-signals-feature",
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    MatButtonModule,
    MatTabsModule,
    UserProfileComponent, // example 2
    CartComponent, // example 3
    BookingComponent, // example 4
  ],
  templateUrl: "./signals-feature.component.html",
})
export class SignalsFeatureComponent {
  count: WritableSignal<number> = signal(0);
  doubleCount: Signal<number> = computed(() => this.count() * 2); // read only

  constructor(private injector: Injector) {
    this.initializeLogging();
  }

  initializeLogging() {
    effect(
      () => {
        console.log(`The Double Count is: ${this.doubleCount()})`);
      },
      { injector: this.injector }
    );
  }

  updateCount() {
    this.count.update((value) => value + 1);
  }
}
