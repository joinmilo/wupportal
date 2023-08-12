import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { PortalFooterModule } from '../portal/shared/footer/portal-footer.module';
import { PortalHeaderModule } from '../portal/shared/header/portal-header.module';
import { LoadingComponent } from '../shared/layout/loading/loading.component';
import { PortalRoutingModule } from './admin-routing.module';
import { adminStateKey } from './constants/admin.constants';
import { AdminLandingComponent } from './shared/landing/admin-landing.component';
import { AdminLayoutModule } from './shared/layout/admin-layout.module';
import { adminReducer } from './state/admin.reducer';

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

const libs = [
  StoreModule.forFeature(adminStateKey, adminReducer),
];

@NgModule({
  imports: [
    ...framework,
    ...libs,
    ...modules,
  ],
})
export class AdminModule { }
