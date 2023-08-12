import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminActions } from 'src/app/admin/state/admin.actions';
import { selectCurrentUser } from 'src/app/core/state/selectors/user.selectors';

@Component({
  selector: 'app-admin-header-mobile',
  templateUrl: './admin-header-mobile.component.html',
  styleUrls: ['./admin-header-mobile.component.scss'],
})
export class AdminHeaderMobileComponent {
  
  public currentUser = this.store.select(selectCurrentUser);
  
  constructor(
    private store: Store) {}

  public openMenu(): void {
    this.store.dispatch(AdminActions.toggleMenu());
  }

}
