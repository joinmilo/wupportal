import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { PortalFooterModule } from 'src/app/portal/modules/footer/portal-footer.module';
import { LoadingComponent } from 'src/app/shared/layout/loading/loading.component';
import { AdminHeaderModule } from '../header/admin-header.module';
import { AdminLayoutComponent } from './components/admin-layout.component';
import { AdminLayoutDesktopComponent } from './components/desktop/admin-layout-desktop.component';
import { AdminLayoutMobileComponent } from './components/mobile/admin-layout-mobile.component';

const components = [
  AdminLayoutComponent,
  AdminLayoutDesktopComponent,
  AdminLayoutMobileComponent,
];

const framework = [
  CommonModule,
  RouterModule,
];

const materials = [
  MatSidenavModule
]

const modules = [
  LoadingComponent,
  AdminHeaderModule,
  PortalFooterModule,
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...materials,
    ...modules,
  ],
})
export class AdminLayoutModule { }
