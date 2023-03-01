import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { CommonActions } from '../../state/common.actions';
import { selectCurrentMenu } from '../../state/common.selectors';

@Component({
  selector: 'app-portal-footer',
  templateUrl: './portal-footer.component.html',
  styleUrls: ['./portal-footer.component.scss']
})
export class PortalFooterComponent {

  public footer = this.store.select(selectCurrentMenu).pipe(tap(menu => console.log('menu', menu)));

  constructor(private store: Store) {
    this.store.dispatch(CommonActions.getMenu());
  }
}



