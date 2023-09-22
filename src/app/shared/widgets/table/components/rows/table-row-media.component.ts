import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { MediaEntity } from 'src/app/core/api/generated/schema';
import { TableRowComponent } from '../../typings/table';

@Component({
  selector: 'app-table-row-media',
  template: `
    <button mat-button>
      <fa-icon *ngIf="input"
        [icon]="['fas', 'image']">
      </fa-icon>
    </button>
  `,
})
export class TableRowMediaComponent implements TableRowComponent<MediaEntity> {
  
  @Input()
  public input?: MediaEntity;

  @Output()
  public valueChanged = new EventEmitter<MediaEntity>();

  constructor(
    private store: Store,
  ) { }
}
