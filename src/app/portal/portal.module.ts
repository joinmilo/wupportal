import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PortalLayoutComponent } from './modules/layout/portal-layout.component';
import { PortalRoutingModule } from './portal-routing.module';

const framework = [
  CommonModule,
  PortalRoutingModule,

  //TODO: Remove once Angular fixes lazy load error:
  
  MatNativeDateModule,
  MatSelectModule,
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
