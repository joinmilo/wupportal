import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { AdminMenuItem } from 'src/app/admin/typings/menu';
import { adminUrl } from 'src/app/core/constants/module.constants';
import { AdminMenuService } from '../../services/admin-menu.service';

@Component({
  selector: 'app-admin-menu-accordion',
  templateUrl: './admin-menu-accordion.component.html',
  styleUrls: ['./admin-menu-accordion.component.scss'],
})
export class AdminMenuAccordionComponent implements OnChanges {

  @Input()
  public active?: boolean;

  @Input()
  public item?: AdminMenuItem;

  @ViewChild(MatExpansionPanel)
  public panel?: MatExpansionPanel;

  constructor(
    public menuService: AdminMenuService,
    private router: Router,
  ) {}

  public ngOnChanges(): void {
    if (!this.active) {
      this.panel?.close();
    }
  }

  public click(): void {
    if (!this.item?.childs?.length) {
      this.panel?.close();
      this.router.navigate([`/${adminUrl}`, this.item?.route]);
    }
  }

}
