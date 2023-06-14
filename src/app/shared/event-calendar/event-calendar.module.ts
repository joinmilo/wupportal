import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CalendarModule } from '../calendar/calendar.module';
import { EventCalendarComponent } from './component/event-calendar.component';
import { eventCalendarStateKey } from './constants/event-calendar.constants';
import { EventCalendarEffects } from './state/event-calendar.effects';
import { eventCalendarReducer } from './state/event-calendar.reducer';

const components = [
  EventCalendarComponent
];

const framework = [
  CommonModule,
];

const modules = [
  CoreModule,
  CalendarModule,
];

const libs = [
  StoreModule.forFeature(eventCalendarStateKey, eventCalendarReducer),
  EffectsModule.forFeature([EventCalendarEffects]),
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...modules,
    ...libs,
  ],
  exports: [...components],
})
export class EventCalendarModule { }