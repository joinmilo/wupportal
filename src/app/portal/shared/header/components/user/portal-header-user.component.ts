import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreUserActions } from 'src/app/core/state/actions/core-user.actions';
import { selectCurrentUser } from 'src/app/core/state/selectors/user.selectors';

@Component({
  selector: 'app-portal-header-user',
  templateUrl: './portal-header-user.component.html',
  styleUrls: ['./portal-header-user.component.scss'],
})
export class PortalHeaderUserComponent {
  public currentUser = this.store.select(selectCurrentUser);

  public logout(): void {
    this.store.dispatch(CoreUserActions.logout())
  }

  constructor(private store: Store) {}
}