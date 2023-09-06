import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { selectAdminSettingsMenu } from 'src/app/admin/state/admin.selectors';
import { AdminMenuItem } from 'src/app/admin/typings/menu';
import { adminUrl, settingsUrl } from 'src/app/core/constants/module.constants';
import { CoreModule } from 'src/app/core/core.module';
import { TitleModule } from 'src/app/shared/layout/title/title.module';

@Component({
  selector: 'app-admin-settings-landing',
  templateUrl: './admin-settings-landing.component.html',
  styleUrls: ['./admin-settings-landing.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    FontAwesomeModule,

    MatCardModule,
    MatDividerModule,

    RouterModule,
    TitleModule,
  ]
})
export class AdminSettingsLandingComponent {

  public menuItems = this.store.select(selectAdminSettingsMenu);

  public adminUrl = adminUrl;
  public settingsUrl = settingsUrl;

  constructor(
    private store: Store,
  ) { }

  public createRouterLink(child: AdminMenuItem): string[] {
    return child.route
      ? [`/${adminUrl}`, settingsUrl, ...child.route.split('/')]
      : [`/${adminUrl}`, settingsUrl];
  }

}
