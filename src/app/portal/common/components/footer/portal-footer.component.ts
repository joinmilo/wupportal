import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Maybe, MenuItemEntity } from 'src/schema/schema';
import { PortalMenuService } from '../../services/portal-menu.service';
import { CommonActions } from '../../state/common.actions';
import { selectCurrentMenu } from '../../state/common.selectors';

@Component({
  selector: 'app-portal-footer',
  templateUrl: './portal-footer.component.html',
  styleUrls: ['./portal-footer.component.scss']
})
export class PortalFooterComponent {

  public footer = this.store.select(selectCurrentMenu);

  constructor(
    private store: Store,
    private menuService: PortalMenuService,
  ) {
    this.store.dispatch(CommonActions.getMenu());
  }

  public route(item: Maybe<MenuItemEntity>) {
    this.menuService.route(item);
  }
}



