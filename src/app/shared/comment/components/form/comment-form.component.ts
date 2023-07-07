import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from '../dialog/comment-dialog.component';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {

  @Output()
  public content = new EventEmitter<string>();

  constructor(public dialog: MatDialog) { }

  public openDialog(): void {
    this.dialog.open(CommentDialogComponent)
      .afterClosed().subscribe((result) => {
        if(result) {
          this.content.emit(result);
        }
    });
  }
}
