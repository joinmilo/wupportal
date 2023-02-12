import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CoreActions } from '../../state/core.actions';
import { FeedbackType } from '../feedback/feedback';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private store: Store,
  ) { }

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req)
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tap((response: any) => response?.body?.errors?.length && this.handleError(response?.body?.errors[0].message)),
        catchError((error) => {
          error?.error?.message
            ? this.handleCritical(error.error.message)
            : this.handleCritical(error?.message);
          return EMPTY;
        }),
      );
  }

  private handleCritical(message: string): void {
    this.store.dispatch(CoreActions.setFeedback({
      type: FeedbackType.Critical,
      message,
      action: 'Schwerwiegender Fehler! Bitte Support kontaktieren.',
    }));
  }

  private handleError(message: string): void {
    this.store.dispatch(CoreActions.setFeedback({
      type: FeedbackType.Error,
      message,
      action: 'Bitte erneut probieren',
    }));
  }
}
