import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { PageEntity } from 'src/schema/schema';
import { pageSlug } from '../constants/page.constants';
import { PageActions } from '../state/page.actions';
import { selectCurrentPage } from '../state/page.selectors';

@Injectable()
export class PageResolver implements Resolve<PageEntity | undefined> {

  constructor(
    private router: Router,
    private store: Store,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PageEntity | undefined> {
    route.paramMap.get(pageSlug) 
      ? this.store.dispatch(PageActions.getPage(route.paramMap.get(pageSlug)))
      : this.store.dispatch(PageActions.getLandingPage());

    return this.store.select(selectCurrentPage)
      .pipe(
        tap(result => !result?.id && this.router.navigate(['/404']))
      );
  }
}