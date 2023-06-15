import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs';
import { slug } from 'src/app/core/constants/core.constants';
import { PortalMainActions } from '../../state/portal-main.actions';
import { selectCurrentPage } from '../../state/portal-main.selectors';

@Component({
  selector: 'app-portal-page',
  templateUrl: './portal-page.component.html',
  styleUrls: ['./portal-page.component.scss']
})
export class PortalPageComponent {

  public page = this.route.paramMap.pipe(
    tap(params => params.get(slug)
      && this.store.dispatch(PortalMainActions.getPage(params.get(slug)))),
    switchMap(() => this.store.select(selectCurrentPage))
  );

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) { }
  
}
