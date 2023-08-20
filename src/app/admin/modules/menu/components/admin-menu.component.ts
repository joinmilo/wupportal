import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAdminMenu } from 'src/app/admin/state/admin.selectors';
import { adminUrl } from 'src/app/core/constants/core.constants';
import { AdminMenuService } from '../services/admin-menu.service';

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
    public menuService: AdminMenuService,
    private store: Store,
  ) { }

}
