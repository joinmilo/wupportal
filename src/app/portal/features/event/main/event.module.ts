import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { PortalCommonModule } from 'src/app/portal/common/common.module';
import { CardModule } from 'src/app/shared/card/card.module';
import { FormModule } from 'src/app/shared/form/form.module';
import { TableModule } from 'src/app/shared/table/table.module';
import { TitleModule } from 'src/app/shared/title/title.module';
import { EventCategoryViewComponent } from './components/category-view/event-category-view.component';
import { EventDetailsComponent } from './components/details/event-details.component';
import { EventFilterAreaComponent } from './components/filter-area/event-filter-area.component';
import { EventListViewComponent } from './components/list-view/event-list-view.component';
import { EventOverviewComponent } from './components/overview/event-overview.component';
import { eventStateKey } from './constants/event.constant';
import { EventPortalRoutingModule } from './event-routing.module';
import { EventEffects } from './state/event.effects';
import { eventReducer } from './state/event.reducer';

const components = [
  EventCategoryViewComponent,
  EventDetailsComponent,
  EventFilterAreaComponent,
  EventListViewComponent,
  EventOverviewComponent,
];

const framework = [
  CommonModule,
];

// const materials = [ ];

const modules = [
  CoreModule,
  CardModule,
  EventPortalRoutingModule,
  FormModule,
  PortalCommonModule,
  TableModule,
  TitleModule,
];

const libs = [
  FontAwesomeModule,
  StoreModule.forFeature(eventStateKey, eventReducer),
  EffectsModule.forFeature([EventEffects]),
]

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    // ...materials,
    ...modules,
    ...libs,
  ],
  exports: [...components],
})
export class EventPortalModule { }
