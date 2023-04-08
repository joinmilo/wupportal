import { Component, Input } from '@angular/core';
import { Maybe } from 'src/schema/schema';
import { CardInput } from '../../../typings/card';

@Component({
  selector: 'app-sponsored-card',
  templateUrl: './sponsored-card.component.html',
  styleUrls: ['./sponsored-card.component.scss']
})
export class SponsoredCardComponent {

  @Input()
  public data?: Maybe<CardInput> = { dateTime: true };
  
}
