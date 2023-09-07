import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAdminSettingsMenu } from 'src/app/admin/state/admin.selectors';

@Component({
  selector: 'app-admin-settings-role',
  templateUrl: './admin-settings-role.component.html',
  styleUrls: ['./admin-settings-role.component.scss'],
  standalone: true,
  imports: [
    CommonModule,

  ]
})
export class AdminSettingsRoleComponent {

  public menuItems = this.store.select(selectAdminSettingsMenu);

  constructor(
    private store: Store,
  ) { }

}
