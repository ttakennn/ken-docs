import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { delay, of } from 'rxjs';
import { Mocks } from '@/app/features/defer/components/defer-loading/data/defer-mockup';
import { InstagramPostComponent } from '@/app/features/defer/components/defer-loading/components/instagram-post/instagram-post.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatButton, InstagramPostComponent],
  selector: 'app-defer-loading',
  template: `
    <div class="flex flex-col overflow-y-auto items-center w-full">
      @for (post of posts$ | async; track post.id) {
        @defer (on viewport; prefetch on idle) {
          <app-instagram-post [post]="post" />
        } @loading {
          <div class="flex flex-col gap-4 p-4 w-96">
            <div
              class="w-full h-64 rounded-md overflow-hidden border-2 border-gray-300 bg-gray-200"
            ></div>
          </div>
        } @placeholder {
          <div class="flex flex-col gap-4 p-4 w-96">
            <div
              class="w-full h-64 rounded-md overflow-hidden border-2 border-gray-300 bg-gray-200"
            ></div>
          </div>
        }
      }
    </div>
  `,
})
export class DeferLoadingComponent {
  posts$ = of(Mocks.data.instagramPosts).pipe(delay(3000));
}
