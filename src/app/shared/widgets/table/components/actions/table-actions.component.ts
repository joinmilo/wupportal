import { Component, Input } from '@angular/core';
import { Maybe } from 'src/app/core/api/generated/schema';
import { contentDetailsUrl } from 'src/app/core/constants/core.constants';
import { ContentData, ContentEntity } from 'src/app/core/typings/content-entity';
import { RowAction } from '../../typings/table';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent<T> {

  @Input({ required: true })
  public actions?: RowAction<T>[];

  @Input({ required: true })
  public data?: ContentData;

  @Input({ required: true })
  public entity?: Maybe<ContentEntity>;

  public createUrl(): string | undefined {
    return contentDetailsUrl(this.entity, this.data);
  }

}