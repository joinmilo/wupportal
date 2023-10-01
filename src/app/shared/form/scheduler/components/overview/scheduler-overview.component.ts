import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SchedulerActions } from '../../state/scheduler.actions';
import { selectResult } from '../../state/scheduler.selectors';

@Component({
  selector: 'app-scheduler-overview',
  templateUrl: './scheduler-overview.component.html',
  styleUrls: ['./scheduler-overview.component.scss'],
})

export class SchedulerOverviewComponent {

  public schedules = this.store.select(selectResult);

  constructor(
    private store: Store,
  ) {}

  public deleteAll(): void {
    this.store.dispatch(SchedulerActions.deleteAll());
  }

  public remove(index: number): void {
    this.store.dispatch(SchedulerActions.delete(index));
  }

}
