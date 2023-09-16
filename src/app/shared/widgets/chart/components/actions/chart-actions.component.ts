import { Component, Input } from '@angular/core';
import { ChartAction } from '../../typings/chart-actions';

@Component({
  selector: 'app-chart-actions',
  templateUrl: './chart-actions.component.html',
  styleUrls: ['./chart-actions.component.scss']
})
export class ChartActionsComponent {

  @Input()
  public actions?: ChartAction[];

}
