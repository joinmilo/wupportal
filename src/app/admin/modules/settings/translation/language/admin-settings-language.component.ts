import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAdminSettingsMenu } from 'src/app/admin/state/admin.selectors';

@Component({
  selector: 'app-admin-settings-language',
  templateUrl: './admin-settings-language.component.html',
  styleUrls: ['./admin-settings-language.component.scss'],
  standalone: true,
  imports: [
    CommonModule,

  ]
})
export class AdminSettingsLanguageComponent {

  public menuItems = this.store.select(selectAdminSettingsMenu);

  constructor(
    private store: Store,
  ) { }

}
