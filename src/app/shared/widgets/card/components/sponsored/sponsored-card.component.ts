import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentData, ContentEntity } from 'src/app/core/typings/content-entity';
import { Maybe } from 'src/schema/schema';
import { CardActionInput, CardActionOutput } from '../../typings/card';

@Component({
  selector: 'app-sponsored-card',
  templateUrl: './sponsored-card.component.html',
  styleUrls: ['./sponsored-card.component.scss'],
})
export class SponsoredCardComponent {

  @Input()
  public actions?: CardActionInput[];

  @Input()
  public entity?: Maybe<ContentEntity>;

  @Input()
  public data?: Maybe<ContentData>;

  @Output()
  public actionClicked = new EventEmitter<CardActionOutput>();

}
