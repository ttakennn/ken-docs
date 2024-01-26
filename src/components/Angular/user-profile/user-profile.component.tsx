import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MainLayoutComponent } from "../../main-layout/main-layout.component";
import { ProfileService } from "./profile.service";

@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, MatButtonModule, MatTabsModule],
  template: `
    <ng-container *ngFor="let profile of userProfile()">
      <p>Name: {{ profile.name }}</p>
      <p>Age: {{ profile.age }}</p>
    </ng-container>
    <button mat-raised-button color="warn" (click)="updateProfile()">
      Update Profile
    </button>
    <button mat-raised-button color="warn" (click)="setProfile()">
      Set Profile
    </button>
  `,
})
export class UserProfileComponent {
  profileService = inject(ProfileService);
  userProfile = this.profileService.userProfileSignals;

  updateProfile() {
    this.profileService.fetchProfile();
  }

  setProfile() {
    this.profileService.setProfile();
  }
}
