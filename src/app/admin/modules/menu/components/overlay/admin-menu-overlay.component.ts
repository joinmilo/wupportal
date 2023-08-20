import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { AdminMenuItem } from 'src/app/admin/typings/menu';
import { adminUrl } from 'src/app/core/constants/core.constants';

@Component({
  selector: 'app-admin-menu-overlay',
  templateUrl: './admin-menu-overlay.component.html',
  styleUrls: ['./admin-menu-overlay.component.scss'],
})
export class AdminMenuOverlayComponent {

  @Input()
  public active?: boolean;

  @Input()
  public childs?: AdminMenuItem[];

  @Input()
  public icon?: IconName;

  @Output()
  public clicked = new EventEmitter<void>();

  public click(trigger: MatMenuTrigger): void {
    this.childs?.length
      ? trigger.openMenu()
      : this.clicked.emit();
  }

  public createRouterLink(child: AdminMenuItem): string {
    return `/${adminUrl}/${child.route as string}`;
  }

}
