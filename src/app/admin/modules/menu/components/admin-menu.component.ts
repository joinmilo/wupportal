import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAdminMainMenu } from 'src/app/admin/state/admin.selectors';
import { adminUrl, settingsUrl } from 'src/app/core/constants/module.constants';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
})
export class AdminMenuComponent {

  @Input()
  public collapsable = true;

  @Output()
  public closed = new EventEmitter<void>();
  
  public collapsed = false;

  public homeRoute = ['/', adminUrl];
  
  public menuItems = this.store.select(selectAdminMainMenu);

  public settingsUrl = settingsUrl;

  constructor(
    private store: Store,
  ) { }

  public onCollapse(): void {
    this.collapsable
      ? this.collapsed = true
      : this.closed.emit();
  }

}
