/* eslint-disable  @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { eventFeatureKey } from './constants/event.constant';
import { EventPortalRoutingModule } from './event-routing.module';
import { EventDetailsComponent } from './pages/details/event-details.component';
import { EventEffects } from './state/event.effects';
import { eventReducer } from './state/event.reducer';

const components: Type<any>[] = [
  EventDetailsComponent
];

const framework: any[] = [
  CommonModule,
  StoreModule.forFeature(eventFeatureKey, eventReducer),
  EffectsModule.forFeature([EventEffects]),
];

const materials: Type<any>[] = [

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
  exports: [...components],
})
export class EventPortalModule { }
