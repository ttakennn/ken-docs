import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MainLayoutComponent } from "../../main-layout/main-layout.component";
import { ProfileService } from "./profile-service.service";

@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, MatButtonModule, MatTabsModule],
  templateUrl: "./user-profile.component.html",
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
