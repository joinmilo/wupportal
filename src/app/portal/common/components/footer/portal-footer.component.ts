import { Component } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Store } from '@ngrx/store';
import { Maybe, MenuItemEntity } from 'src/schema/schema';
import { PortalMenuService } from '../../services/portal-menu.service';
import { CommonActions } from '../../state/common.actions';
import { selectMenu, selectSocialMedia } from '../../state/common.selectors';

@Component({
  selector: 'app-portal-footer',
  templateUrl: './portal-footer.component.html',
  styleUrls: ['./portal-footer.component.scss']
})
export class PortalFooterComponent {

  public menu = this.store.select(selectMenu);
  public socialMedia = this.store.select(selectSocialMedia);

  constructor(
    private store: Store,
    private menuService: PortalMenuService,
  ) {
    this.store.dispatch(CommonActions.getMenu());
    this.store.dispatch(CommonActions.getSocialMedia())
  }

  public route(item: Maybe<MenuItemEntity>) {
    this.menuService.route(item);
  }

  public icon(name?: Maybe<string>) {
    return name as IconName;
  }
}



