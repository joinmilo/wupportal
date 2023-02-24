/* eslint-disable  @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from 'src/app/core/core.module';
import { EventPortalRoutingModule } from './event-routing.module';

const components: Type<any>[] = [
];

const framework: Type<any>[] = [
  CommonModule,
];

const materials: Type<any>[] = [
  MatToolbarModule,
];

const modules: Type<any>[] = [
  CoreModule,
  EventPortalRoutingModule,
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...materials,
    ...modules,
  ],
})
export class EventPortalModule { }
