import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MediaEntity } from 'src/app/core/api/generated/schema';
import { MediaViewerComponent } from 'src/app/shared/media/components/viewer/media-viewer.component';
import { MediaViewerData } from 'src/app/shared/media/typings/media';
import { TableCellComponent } from '../../typings/cell';

@Component({
  selector: 'app-table-cell-media',
  template: `
    <button mat-button *ngIf="input" (click)="openGallery()">
      <fa-icon [icon]="['fas', 'image']">
      </fa-icon>
    </button>
  `,
})
export class TableCellMediaComponent extends TableCellComponent<MediaEntity> {

  constructor(
    store: Store,

    private dialog: MatDialog,
  ) { super(store); }

  public openGallery(): void {
    this.dialog.open(MediaViewerComponent, {
      data: {
        media: [this.input],
        currentIndex: 0
      } as MediaViewerData,
      panelClass: 'media-dialog',
      autoFocus: false,
    });
  }
}
