import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CoreModule } from 'src/app/core/core.module';
import { CardModule } from 'src/app/shared/card/card.module';
import { EventCalendarModule } from 'src/app/shared/event-calendar/event-calendar.module';
import { TitleModule } from 'src/app/shared/title/title.module';
import { CalendarPageFeatureComponent } from './component/calendar-page-feature.component';

const components = [
  CalendarPageFeatureComponent
];

const framework = [
  CommonModule,
];

const materials = [
  MatCardModule,
];

const modules = [
  CoreModule,
  CardModule,
  EventCalendarModule,
  TitleModule,
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
export class PortalCalendarPageFeatureModule { }
