import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAdminSettingsMenu } from 'src/app/admin/state/admin.selectors';

@Component({
  selector: 'app-admin-settings-pages-overview',
  templateUrl: './admin-settings-pages-overview.component.html',
  styleUrls: ['./admin-settings-pages-overview.component.scss'],
  standalone: true,
  imports: [
    CommonModule,

  ]
})
export class AdminSettingsPagesOverviewComponent {

  public menuItems = this.store.select(selectAdminSettingsMenu);

  constructor(
    private store: Store,
  ) { }

}
