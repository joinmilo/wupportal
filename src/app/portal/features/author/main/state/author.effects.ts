import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class AuthorEffects {

  constructor(
    private actions: Actions,
  ) {}
}
