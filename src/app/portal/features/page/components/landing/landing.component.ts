import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageActions } from '../../state/page.actions';
import { selectCurrentPage } from '../../state/page.selectors';

@Component({
  selector: 'app-page-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class PageLandingComponent {

  public page = this.store.select(selectCurrentPage);

  constructor(
    private store: Store,
  ) {
    this.store.dispatch(PageActions.getLandingPage());
  }

}
