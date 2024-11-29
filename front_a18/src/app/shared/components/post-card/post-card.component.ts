import { Component, Input } from '@angular/core';
import { Post } from '../../../features/posts/interfaces/post.interface';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {

  @Input() post!: Post;

}
