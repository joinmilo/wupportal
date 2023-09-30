import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SchedulerActions } from '../../state/scheduler.actions';
import { selectErrors } from '../../state/scheduler.selectors';

@Component({
  selector: 'app-scheduler-generate',
  templateUrl: './scheduler-generate.component.html',
  styleUrls: ['./scheduler-generate.component.scss'],
})
export class SchedulerGenerateComponent {

  public errors = this.store.select(selectErrors);

  constructor(
    private store: Store,
  ) { }

  public generate(): void {    
    this.store.dispatch(SchedulerActions.generateResult());
  }

}
