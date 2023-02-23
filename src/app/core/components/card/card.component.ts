import { Component, Input } from '@angular/core';
import { AddressEntity, MediaEntity } from 'src/schema/schema';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input()
  public address?: AddressEntity;
  
  @Input()
  public category?: string;

  @Input()
  public creator?: string;

  @Input()
  public creatorImage?: MediaEntity;
  
  @Input()
  public date?: string;

  @Input()
  public dateTime = true;

  @Input()
  public image?: MediaEntity;

  @Input()
  public text?: string;

  @Input()
  public title?: string;

}
