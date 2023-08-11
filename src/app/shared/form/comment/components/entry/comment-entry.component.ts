import { Component, Input } from '@angular/core';
import { Maybe } from 'src/schema/schema';
import { Comment } from '../../typings/comment';

@Component({
  selector: 'app-comment-entry',
  templateUrl: './comment-entry.component.html',
  styleUrls: ['./comment-entry.component.scss']
})
export class CommentEntryComponent {

  @Input()
  public comment?: Maybe<Comment>;
}