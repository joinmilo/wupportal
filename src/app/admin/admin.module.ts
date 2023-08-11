import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortalFooterModule } from '../portal/shared/footer/portal-footer.module';
import { PortalHeaderModule } from '../portal/shared/header/portal-header.module';
import { LoadingComponent } from '../shared/layout/loading/loading.component';
import { PortalRoutingModule } from './admin-routing.module';
import { AdminLandingComponent } from './shared/landing/admin-landing.component';
import { AdminLayoutModule } from './shared/layout/admin-layout.module';

const framework = [
  CommonModule,
  PortalRoutingModule
];

const modules = [
  AdminLandingComponent,
  AdminLayoutModule,
  LoadingComponent,
  PortalHeaderModule,
  PortalFooterModule,
];

@NgModule({
  imports: [
    ...framework,
    ...modules,
  ],
})
export class AdminModule { }
