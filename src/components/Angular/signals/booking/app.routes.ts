import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SignalsFeatureComponent } from "./signals-feature/signals-feature.component";

export const routes: Routes = [
  { path: "home", title: "Home", component: HomeComponent },
  { path: "about", title: "About", component: AboutComponent },
  { path: "contact", title: "Contact", component: ContactComponent },
  { path: "signals", title: "Signals", component: SignalsFeatureComponent },
  //highlight-start
  {
    path: "booking-detail/:id",
    loadComponent: () =>
      import("./signals-feature/booking-detail/booking-detail.component"),
  },
  //highlight-end
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];
