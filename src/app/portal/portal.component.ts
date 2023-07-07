import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading } from '../core/state/selectors/core.selectors';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent {

  public loading = this.store.select(selectIsLoading);

  constructor(
    private store: Store,
  ) { }
}
