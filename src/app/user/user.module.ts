import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortalFooterModule } from '../portal/modules/footer/portal-footer.module';
import { PortalHeaderModule } from '../portal/modules/header/portal-header.module';
import { LoadingComponent } from '../shared/layout/loading/loading.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

const components = [
  UserComponent
];

const framework = [
  CommonModule,
  UserRoutingModule,
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
export class UserModule { }
