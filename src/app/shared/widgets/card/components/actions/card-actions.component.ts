import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentData, ContentEntity } from 'src/app/core/typings/content-entity';
import { CardActionInput } from 'src/app/shared/widgets/card/typings/card';
import { Maybe } from 'src/schema/schema';

@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss']
})
export class CardActionsComponent {

  @Input()
  public entity?: Maybe<ContentEntity>;

  @Input()
  public data?: Maybe<ContentData>;

  @Input()
  public actions?: CardActionInput[];

  @Output()
  public actionClicked = new EventEmitter<CardActionInput>();

}
