import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap, tap } from 'rxjs';
import { PageEntity } from 'src/schema/schema';
import { pageSlug } from '../../constants/page.constants';
import { PageActions } from '../../state/page.actions';
import { selectCurrentPage } from '../../state/page.selectors';

@Component({
  selector: 'app-portal-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PortalPageComponent {

  public page?: Observable<PageEntity>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {
    this.route.queryParams
      .pipe(
        tap(params => params[pageSlug]
          ? this.store.dispatch(PageActions.getPage(params[pageSlug]))
          : this.store.dispatch(PageActions.getLandingPage())),
        switchMap(() => this.store.select(selectCurrentPage)),
        tap(result => !result && this.router.navigate(['/404']))
      ).subscribe();
  }
  
}
