import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMenuItem } from 'src/app/admin/typings/menu';
import { adminUrl } from 'src/app/core/constants/module.constants';

@Injectable()
export class AdminMenuService {

  constructor(
    private router: Router,
  ) { }

  public isRouteActive(item: AdminMenuItem): boolean {
    return this.isChildRouteActive(item.childs)
      || this.isActive(`/${adminUrl}/${item.route}`);
  }

  private isChildRouteActive(childs: AdminMenuItem[] | undefined): boolean {
    return !!childs?.find(child => this.isActive(`/${adminUrl}/${child.route}`))
  }

  private isActive(route: string): boolean {
    return this.router.isActive(route, {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored'
    })
  }

  public createRouterLink(child: AdminMenuItem): string[] {
    return [`/${adminUrl}`, ...child.route.split('/')];
  }
}
