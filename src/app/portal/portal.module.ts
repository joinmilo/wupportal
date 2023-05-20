import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { PortalFooterModule } from './shared/footer/portal-footer.module';
import { PortalHeaderModule } from './shared/header/portal-header.module';

const components = [
  PortalComponent
];

const framework = [
  CommonModule,
  PortalRoutingModule
];

const materials = [
  MatProgressBarModule,
]

const modules = [
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
export class PortalModule { }
