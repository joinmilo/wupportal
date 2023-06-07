import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CardModule } from 'src/app/shared/card/card.module';
import { EventFilterModule } from 'src/app/shared/event-filter/event-filter.module';
import { FormModule } from 'src/app/shared/form/form.module';
import { TableModule } from 'src/app/shared/table/table.module';
import { TitleModule } from 'src/app/shared/title/title.module';
import { PortalEventCategoryViewComponent } from './components/category-view/portal-event-category-view.component';
import { PortalEventOverviewComponent } from './components/overview/portal-event-overview.component';
import { PortalEventTableViewComponent } from './components/table-view/portal-event-table-view.component';
import { portalEventOverviewStateKey } from './constants/portal-event-overview.constant';
import { PortalEventOverviewRoutingModule } from './portal-event-overview-routing.module';
import { PortalEventOverviewFilterService } from './services/portal-event-overview-filter.service';
import { PortalEventOverviewEffects } from './state/portal-event-overview.effects';
import { portalEventOverviewReducer } from './state/portal-event-overview.reducer';

const components = [
  PortalEventCategoryViewComponent,
  PortalEventTableViewComponent,
  PortalEventOverviewComponent,
];

const framework = [
  CommonModule,
];

const modules = [
  CoreModule,
  CardModule,
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

const providers = [
  PortalEventOverviewFilterService,
]

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...modules,
    ...libs,
  ],
  exports: [...components],
  providers: [...providers]
})
export class PortalEventOverviewModule { }
