import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { AnalyticsRatingComponent } from 'src/app/shared/widgets/analytics/components/rating/analytics-rating.component';
import { EventAdminDetailsRatingComponent } from './component/event-admin-details-rating.component';
import { eventAdminDetailsRatingStateKey } from './constants/event-admin-details-rating.constants';
import { EventAdminDetailsRatingEffects } from './state/event-admin-details-rating.effects';
import { eventAdminDetailsRatingReducer } from './state/event-admin-details-rating.reducer';

const components = [
  EventAdminDetailsRatingComponent,
];

const framework = [
  CommonModule,
];

const modules = [
  CoreModule,
  AnalyticsRatingComponent,
];

const libs = [
  StoreModule.forFeature(eventAdminDetailsRatingStateKey, eventAdminDetailsRatingReducer),
  EffectsModule.forFeature([EventAdminDetailsRatingEffects]),
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
export class EventAdminDetailsRatingModule { }
