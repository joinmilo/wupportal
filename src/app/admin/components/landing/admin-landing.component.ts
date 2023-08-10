import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading } from 'src/app/core/state/selectors/core.selectors';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss']
})
export class AdminLandingComponent {

  public loading = this.store.select(selectIsLoading);

  constructor(
    private store: Store,
  ) { }
}
