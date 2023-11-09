import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { selectLanguage } from '../state/selectors/core.selectors';

@Injectable({ providedIn: 'root' })
export class LanguageInterceptor implements HttpInterceptor {

  constructor(
    private store: Store,
  ) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectLanguage)
      .pipe(
        take(1),
        switchMap(language => next.handle(
          request.clone({ headers: request.headers.set('Accept-Language', language?.locale as string)})
        )),
      );
  } 
}
