import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalLayoutComponent } from './shared/layout/portal-layout.component';

const framework = [
  CommonModule,
  PortalRoutingModule,
];

const modules = [
  PortalLayoutComponent,
];

@NgModule({
  imports: [
    ...framework,
    ...modules,
  ],
})
export class PortalModule { }
