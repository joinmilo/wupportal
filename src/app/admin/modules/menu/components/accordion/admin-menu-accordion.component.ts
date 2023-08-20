import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { AdminMenuItem } from 'src/app/admin/typings/menu';
import { adminUrl } from 'src/app/core/constants/core.constants';

@Component({
  selector: 'app-admin-menu-accordion',
  templateUrl: './admin-menu-accordion.component.html',
  styleUrls: ['./admin-menu-accordion.component.scss'],
})
export class AdminMenuAccordionComponent {

  @Input()
  public active?: boolean;

  @Input()
  public childs?: AdminMenuItem[];

  @Input()
  public icon?: IconName;

  @Input()
  public label?: string;

  @Output()
  public clicked = new EventEmitter<void>();

  public click(panel: MatExpansionPanel): void {
    if (!this.childs?.length) {
      panel.close();
      this.clicked.emit();
    }
  }

  public createRouterLink(child: AdminMenuItem): string {
    return `/${adminUrl}/${child.route as string}`;
  }

}
