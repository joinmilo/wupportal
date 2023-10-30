import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AdminMenuItem } from 'src/app/admin/typings/menu';
import { adminUrl } from 'src/app/core/constants/module.constants';
import { AdminMenuService } from '../../services/admin-menu.service';

@Component({
  selector: 'app-admin-menu-accordion',
  templateUrl: './admin-menu-accordion.component.html',
  styleUrls: ['./admin-menu-accordion.component.scss'],
})
export class AdminMenuAccordionComponent {

  @Input()
  public item?: AdminMenuItem;

  @Output()
  public clicked = new EventEmitter<void>();

  @ViewChild(MatExpansionPanel)
  public panel?: MatExpansionPanel;

  public active?: boolean;

  constructor(
    public menuService: AdminMenuService,
    private router: Router,
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.active = this.menuService.isRouteActive(this.item);
        
        if (!this.active) {
          this.panel?.close();
        }
      })
  }

  public click(): void {
    if (!this.item?.childs?.length) {
      this.panel?.close();
      this.item?.route
        ? this.router.navigate([`/${adminUrl}`, this.item?.route])
        : this.clicked.emit();
    }
  }

}
