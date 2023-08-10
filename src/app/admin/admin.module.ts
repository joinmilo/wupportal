import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoadingComponent } from '../shared/loading/loading.component';
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
