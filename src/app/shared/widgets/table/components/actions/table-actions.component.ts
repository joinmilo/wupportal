import { Component, Input } from '@angular/core';
import { Maybe } from 'src/app/core/api/generated/schema';
import { contentPortalDetailsUrl } from 'src/app/core/constants/core.constants';
import { ContentData, ContentEntity } from 'src/app/core/typings/content-entity';
import { RowAction, RowDefaultAction } from '../../typings/table';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent<T> {

  @Input()
  public actions?: RowAction<T>[];

  @Input()
  public defaultActions?: RowDefaultAction[];

  @Input({ required: true })
  public data?: Maybe<T>;

  @Input({ required: true })
  public entity?: Maybe<ContentEntity>;

  public dataAsContent(): Maybe<ContentData> {
    return this.data as ContentData;
  }

  public createUrl(): string | undefined {
    return contentPortalDetailsUrl(this.entity, this.data as ContentData);
  }

}