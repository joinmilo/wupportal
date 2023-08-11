import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PortalFooterModule } from '../portal/shared/footer/portal-footer.module';
import { PortalHeaderModule } from '../portal/shared/header/portal-header.module';
import { LoadingComponent } from '../shared/layout/loading/loading.component';
import { PortalRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDesktopComponent } from './components/admin/desktop/admin-desktop.component';
import { AdminLandingComponent } from './components/landing/admin-landing.component';

const components = [
  AdminComponent,
  AdminDesktopComponent,
  AdminLandingComponent
];

const framework = [
  CommonModule,
  PortalRoutingModule
];

const materials = [
  MatSidenavModule
]

const modules = [
  LoadingComponent,
  PortalHeaderModule,
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
export class AdminModule { }
