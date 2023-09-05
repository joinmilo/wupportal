import { Component, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AdminMenuItem } from 'src/app/admin/typings/menu';
import { adminUrl } from 'src/app/core/constants/module.constants';
import { AdminMenuService } from '../../services/admin-menu.service';

@Component({
  selector: 'app-admin-menu-overlay',
  templateUrl: './admin-menu-overlay.component.html',
  styleUrls: ['./admin-menu-overlay.component.scss'],
})
export class AdminMenuOverlayComponent {

  @Input()
  public active?: boolean;

  @Input()
  public item?: AdminMenuItem;

  constructor(
    public menuService: AdminMenuService,
    private router: Router,
  ) { }

  public click(trigger: MatMenuTrigger): void {
    this.item?.childs?.length
      ? trigger.openMenu()
      : this.router.navigate([`${adminUrl}`, this.item?.route]);
  }

}
