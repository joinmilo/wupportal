/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { Maybe } from 'src/app/core/api/generated/schema';

@Component({
  selector: 'app-rating-distribution',
  templateUrl: './rating-distribution.component.html',
  styleUrls: ['./rating-distribution.component.scss'],
})
export class RatingDistributionComponent {
  
  @Input()
  public key: Maybe<string> = '';

  @Input()
  public set value(value: Maybe<number>) {
    this.displayValue = value && value <= 1.0
      ? (value * 100).toFixed()
      : value?.toFixed().toString();
  }

  public displayValue?: Maybe<string>;

  

}
