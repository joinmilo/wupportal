import { Component, Input } from '@angular/core';
import { Maybe } from 'src/app/core/api/generated/schema';
import { Period } from 'src/app/core/typings/period';

@Component({
  selector: 'app-scheduler-overview',
  templateUrl: './scheduler-overview.component.html',
  styleUrls: ['./scheduler-overview.component.scss'],
})

export class SchedulerOverviewComponent {

  @Input()
  public schedules?: Maybe<Period[]>;

}
