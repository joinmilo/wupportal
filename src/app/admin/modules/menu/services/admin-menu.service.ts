import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMenuItem } from 'src/app/admin/typings/menu';
import { adminUrl } from 'src/app/core/constants/core.constants';

@Injectable()
export class AdminMenuService {

  constructor(
    private router: Router,
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
