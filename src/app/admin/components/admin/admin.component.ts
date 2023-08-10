import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading } from 'src/app/core/state/selectors/core.selectors';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public loading = this.store.select(selectIsLoading);

  constructor(
    private store: Store,
  ) { }
}
