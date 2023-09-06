import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminSettingsRoutingModule } from './admin-settings-routing.module';
import { AdminSettingsCmsRoutingModule } from './cms/admin-settings-cms.routing.module';

const framework = [
  CommonModule,
];

const modules = [
  AdminSettingsCmsRoutingModule,
  AdminSettingsRoutingModule, //TODO: always last entry duet to order and redirect to 404, Remove 404 and put in AppRouter
];

@NgModule({
  imports: [
    ...framework,
    ...modules,
  ],
})
export class AdminSettingsModule { }
