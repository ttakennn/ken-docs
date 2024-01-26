import { Injectable, WritableSignal, signal } from "@angular/core";

interface UserProfile {
  age: number;
  name: string;
}

@Injectable({ providedIn: "root" })
export class ProfileService {
  userProfileSignals: WritableSignal<UserProfile[]> = signal([
    { age: 30, name: "Mr. T" },
  ]);

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async fetchProfile() {
    await this.delay(300);
    const payload = {
      age: Math.floor(Math.random() * 100),
      name: "TTA" + new Date().getTime(),
    } as UserProfile;
    this.userProfileSignals.set([payload]);
  }

  async setProfile() {
    await this.delay(300);
    const payload = {
      age: Math.floor(Math.random() * 100),
      name: "TTA" + new Date().getTime(),
    } as UserProfile;
    this.userProfileSignals.update((profile: UserProfile[]) => [
      ...profile,
      payload,
    ]);
  }
}
