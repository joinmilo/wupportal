import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Observable } from 'rxjs';
import { MenuItemEntity } from 'src/schema/schema';
import { CommonActions } from '../../state/common.actions';
import { selectCurrentMenu } from '../../state/common.selectors';

@Component({
  selector: 'app-portal-footer',
  templateUrl: './portal-footer.component.html',
  styleUrls: ['./portal-footer.component.scss']
})
export class PortalFooterComponent {

  footer: Observable<Maybe<MenuItemEntity[]> | undefined> = this.store.select(selectCurrentMenu);

  constructor(private store: Store) {
    this.store.dispatch(CommonActions.getMenu());
  }
}



