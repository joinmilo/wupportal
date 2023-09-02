import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import packageJson from 'package.json';
import { platformCompanyConfig, platformLogoConfig, platformUrlConfig } from 'src/app/core/constants/configuration.constants';
import { selectConfiguration, selectServerInfo } from 'src/app/core/state/selectors/core.selectors';
import { selectAdminFooterMenu } from '../state/admin-footer.selectors';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.scss'],
})
export class AdminFooterComponent {

  public clientVersion = packageJson.version;

  public get currentYear(): number {
    return new Date().getFullYear();
  }

  public menu = this.store.select(selectAdminFooterMenu);

  public platformCompany = this.store.select(selectConfiguration(platformCompanyConfig));
  public platformLogo = this.store.select(selectConfiguration(platformLogoConfig));
  public platformUrl = this.store.select(selectConfiguration(platformUrlConfig));

  public serverVersion = this.store.select(selectServerInfo);

  constructor(
    private store: Store
  ) { }

}
