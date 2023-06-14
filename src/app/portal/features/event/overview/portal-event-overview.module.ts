import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CardModule } from 'src/app/shared/card/card.module';
import { EventCalendarModule } from 'src/app/shared/event-calendar/event-calendar.module';
import { EventFilterModule } from 'src/app/shared/event-filter/event-filter.module';
import { FormModule } from 'src/app/shared/form/form.module';
import { TableModule } from 'src/app/shared/table/table.module';
import { TitleModule } from 'src/app/shared/title/title.module';
import { PortalEventOverviewCalendarComponent } from './components/calendar/portal-event-overview-calendar.component';
import { PortalEventOverviewCategoryComponent } from './components/category/portal-event-overview-category.component';
import { PortalEventOverviewEmptyComponent } from './components/empty/portal-event-overview-empty.component';
import { PortalEventOverviewComponent } from './components/portal-event-overview.component';
import { PortalEventOverviewTableComponent } from './components/table/portal-event-overview-table.component';
import { portalEventOverviewStateKey } from './constants/portal-event-overview.constants';
import { PortalEventOverviewRoutingModule } from './portal-event-overview-routing.module';
import { PortalEventOverviewEffects } from './state/portal-event-overview.effects';
import { portalEventOverviewReducer } from './state/portal-event-overview.reducer';

const components = [
  PortalEventOverviewComponent,
  PortalEventOverviewCalendarComponent,
  PortalEventOverviewCategoryComponent,
  PortalEventOverviewEmptyComponent,
  PortalEventOverviewTableComponent,
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
  EventFilterModule,
  PortalEventOverviewRoutingModule,
  FormModule,
  TableModule,
  TitleModule,
];

const libs = [
  FontAwesomeModule,
  StoreModule.forFeature(portalEventOverviewStateKey, portalEventOverviewReducer),
  EffectsModule.forFeature([PortalEventOverviewEffects]),
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...materials,
    ...modules,
    ...libs,
  ],
  exports: [...components],
})
export class PortalEventOverviewModule { }
