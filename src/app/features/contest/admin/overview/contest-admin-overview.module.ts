import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { ContestFilterModule } from 'src/app/shared/filter/contest/contest-filter.module';
import { TitleModule } from 'src/app/shared/layout/title/title.module';
import { TableModule } from 'src/app/shared/widgets/table/table.module';
import { ContestAdminOverviewComponent } from './component/contest-admin-overview.component';
import { contestAdminOverviewStateKey } from './constants/contest-admin-overview.constants';
import { ContestAdminOverviewRoutingModule } from './contest-admin-overview-routing.module';
import { ContestAdminOverviewEffects } from './state/contest-portal-overview.effects';
import { contestAdminOverviewReducer } from './state/contest-portal-overview.reducer';

const components = [
  ContestAdminOverviewComponent
]

const framework = [
  CommonModule,
];

const materials = [
  MatButtonModule,
  MatCardModule,
];

const modules = [
  CoreModule,
  ContestFilterModule,
  ContestAdminOverviewRoutingModule,
  TableModule,
  TitleModule,
];

const libs = [
  StoreModule.forFeature(contestAdminOverviewStateKey, contestAdminOverviewReducer),
  EffectsModule.forFeature([ContestAdminOverviewEffects]),
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...libs,
    ...materials,
    ...modules,
  ],
  exports: [...components],
})
export class ContestAdminOverviewModule { }
