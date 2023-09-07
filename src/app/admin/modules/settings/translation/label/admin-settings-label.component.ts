import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAdminSettingsMenu } from 'src/app/admin/state/admin.selectors';

@Component({
  selector: 'app-admin-settings-label',
  templateUrl: './admin-settings-label.component.html',
  styleUrls: ['./admin-settings-label.component.scss'],
  standalone: true,
  imports: [
    CommonModule,

  ]
})
export class AdminSettingsLabelComponent {

  public menuItems = this.store.select(selectAdminSettingsMenu);

  constructor(
    private store: Store,
  ) { }

}
