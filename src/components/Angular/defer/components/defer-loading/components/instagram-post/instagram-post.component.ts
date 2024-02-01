import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PostCommentsComponent } from '@/app/features/defer/components/defer-loading/components/comments-post/comments-post.component';

@Component({
  selector: 'app-instagram-post',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, PostCommentsComponent],
  templateUrl: './instagram-post.component.html',
})
export class InstagramPostComponent implements OnInit {
  @Input() post: any;
  showComments = false;

  ngOnInit(): void {
    console.log('InstagramPostComponent: ', this.post);
  }
}
