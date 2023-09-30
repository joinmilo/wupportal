import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';


@Injectable()
export class SchedulerEffects {

  constructor(
    private actions: Actions,
  ) {}
}
