/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-distribution',
  templateUrl: './rating-distribution.component.html',
  styleUrls: ['./rating-distribution.component.scss'],
})
export class RatingDistributionComponent {
  
  @Input()
  public key: any = '';

  @Input()
  public value: any = 0;

}
