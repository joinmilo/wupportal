import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAdminMenu } from 'src/app/admin/state/admin.selectors';
import { AdminMenuItem } from 'src/app/admin/typings/menu';
import { adminUrl } from 'src/app/core/constants/core.constants';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
})
export class AdminMenuComponent {

  public collapsed = false;

  public homeRoute = ['/', adminUrl];

  public menuItems = this.store.select(selectAdminMenu);

  constructor(
    private router: Router,
    private store: Store,
  ) { }

  public isChildRouteActive(item: AdminMenuItem): boolean {
    return !!item.childs?.find(child => this.router.isActive(this.createRouterLink(child), {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored'
    }));
  }

  public createRouterLink(child: AdminMenuItem): string {
    return `/${adminUrl}/${child.route as string}`;
  }

}
