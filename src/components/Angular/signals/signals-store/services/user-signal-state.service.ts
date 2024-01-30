import { Injectable } from '@angular/core';
import { SignalSimpleStoreService } from '@/app/features/signals-feature/signals-store/services/signal-simple-store.service';

export interface UserState {
  name: string;
  company: string;
  address: string;
}

@Injectable()
export class UserSignalStateService extends SignalSimpleStoreService<UserState> {
  constructor() {
    super();
  }
}
