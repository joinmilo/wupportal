import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { AnalyticsVisitorsComponent } from 'src/app/shared/widgets/analytics/components/visitors/analytics-visitors.component';
import { EventAdminDetailsVisitorsComponent } from './component/event-admin-details-visitors.component';
import { eventAdminDetailsVisitorsStateKey } from './constants/event-admin-details-visitors.constants';
import { EventAdminDetailsVisitorsEffects } from './state/event-admin-details-visitors.effects';
import { eventAdminDetailsVisitorsReducer } from './state/event-admin-details-visitors.reducer';

const components = [
  EventAdminDetailsVisitorsComponent,
]

const framework = [
  CommonModule,
];

const modules = [
  CoreModule,
  AnalyticsVisitorsComponent,
];

const libs = [
  StoreModule.forFeature(eventAdminDetailsVisitorsStateKey, eventAdminDetailsVisitorsReducer),
  EffectsModule.forFeature([EventAdminDetailsVisitorsEffects]),
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...libs,
    ...modules,
  ],
  exports: [...components],
})
export class EventAdminDetailsVisitorsModule { }
