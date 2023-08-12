import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading } from 'src/app/core/state/selectors/core.selectors';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  public loading = this.store.select(selectIsLoading);

  constructor(
    private store: Store,
  ) { }
}
