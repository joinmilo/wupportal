import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ContentChildren, EventEmitter, OnDestroy, Output, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmDeleteComponent } from '../../../dialogs/confirm-delete/confirm-delete.component';
import { DragDropDirective } from '../directive/drag-drop.directive';
import { DragDropElement } from '../typings/drag-drop-element';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnDestroy {

  @Output()
  public deleted = new EventEmitter<number>();

  @Output()
  public updated = new EventEmitter<number[]>();

  @ContentChildren(DragDropDirective)
  public set directives(directives: QueryList<DragDropDirective>) {
    this.elements = directives?.length
      ? directives.toArray().map((directive, initIndex) => ({
          directive,
          initIndex
        }))
      : [];
  }

  public elements!: DragDropElement[];

  private bodyElement: HTMLElement = document.body;

  private destroy = new Subject<void>();

  constructor(
    private dialog: MatDialog,
  ) {}

  public drag(): void {
    this.bodyElement.classList.add('inheritCursors');
    this.bodyElement.style.cursor = 'grabbing';
  }

  public drop(event: CdkDragDrop<DragDropElement[]>): void {
    this.bodyElement.classList.remove('inheritCursors');
    this.bodyElement.style.cursor = 'unset';

    moveItemInArray(this.elements, event.previousIndex, event.currentIndex);
    this.updated.emit(this.elements.map(element => element.initIndex));
  }

  public onDelete(index: number) {
    this.dialog.open(ConfirmDeleteComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy))
      .subscribe(confirmed => {
        if (confirmed) {
          this.deleted.emit(index);
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
