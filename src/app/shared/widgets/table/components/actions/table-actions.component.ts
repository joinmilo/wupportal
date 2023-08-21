import { Component, Input } from '@angular/core';
import { ContentData } from 'src/app/core/typings/content-entity';
import { RowAction } from '../../typings/table';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent<T> {

  @Input()
  public actions?: RowAction<T>[];

  @Input()
  public row?: ContentData;

}