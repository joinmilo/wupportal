import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from '../shared/loading/loading.component';
import { PortalComponent } from './component/portal.component';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalFooterModule } from './shared/footer/portal-footer.module';
import { PortalHeaderModule } from './shared/header/portal-header.module';

const components = [
  PortalComponent
];

const framework = [
  CommonModule,
  PortalRoutingModule,
];

const modules = [
  PortalHeaderModule,
  PortalFooterModule,

  LoadingComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...modules,
  ],
})
export class PortalModule { }
