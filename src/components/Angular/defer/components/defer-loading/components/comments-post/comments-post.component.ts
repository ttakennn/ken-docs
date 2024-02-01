import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of, tap } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Mocks } from '@/app/features/defer/components/defer-loading/data/defer-mockup';

@Component({
  selector: 'app-post-comments',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (comment of comments$ | async; track comment.id) {
      <div>
        <div class="flex items-center gap-2">
          <strong class="font-medium text-gray-600">{{ comment.userName }}</strong>
          <p class="text-sm text-gray-500">{{ comment.comment }}</p>
        </div>
        <p class="text-xs text-gray-400">{{ comment.timeAgo }}</p>
      </div>
    }
  `,
})
export class PostCommentsComponent {
  comments$ = of(Mocks.data.comments).pipe(
    tap((comment) => console.log(`Loading Comments`)),
    delay(2000),
  );
}
