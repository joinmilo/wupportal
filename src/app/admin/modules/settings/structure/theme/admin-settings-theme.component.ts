import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAdminSettingsMenu } from 'src/app/admin/state/admin.selectors';

@Component({
  selector: 'app-admin-settings-theme',
  templateUrl: './admin-settings-theme.component.html',
  styleUrls: ['./admin-settings-theme.component.scss'],
  standalone: true,
  imports: [
    CommonModule,

  ]
})
export class AdminSettingsThemeComponent {

  public menuItems = this.store.select(selectAdminSettingsMenu);

  constructor(
    private store: Store,
  ) { }

}
