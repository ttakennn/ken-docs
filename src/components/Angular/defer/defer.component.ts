import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '@/app/main-layout/main-layout.component';
import { DeferBasicComponent } from '@/app/features/defer/components/defer-basic/defer-basic.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DeferLoadingComponent } from '@/app/features/defer/components/defer-loading/defer-loading.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    DeferBasicComponent,
    DeferLoadingComponent,
    MatButtonModule,
    MatTabsModule,
  ],
  selector: 'app-defer',
  template: `
    <app-main-layout>
      <ng-container title> Defer </ng-container>
      <ng-container container>
        <mat-tab-group>
          <mat-tab label="Defer Basic">
            <app-defer-basic />
          </mat-tab>
          <mat-tab label="Defer Loading">
            <app-defer-loading />
          </mat-tab>
        </mat-tab-group>
      </ng-container>
    </app-main-layout>
  `,
})
export class DeferComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
