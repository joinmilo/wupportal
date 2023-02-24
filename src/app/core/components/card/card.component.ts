import { Component, Input } from '@angular/core';
import { AddressEntity, Maybe, MediaEntity } from 'src/schema/schema';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input()
  public address?: Maybe<AddressEntity>;
  
  @Input()
  public category?: Maybe<string>;

  @Input()
  public creator?: Maybe<string>;

  @Input()
  public creatorImage?: Maybe<MediaEntity>;
  
  @Input()
  public date?: Maybe<string>;

  @Input()
  public dateTime = true;

  @Input()
  public image?: Maybe<MediaEntity>;

  @Input()
  public text?: Maybe<string>;

  @Input()
  public title?: Maybe<string>;

}
