import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { ArticleFilterModule } from 'src/app/shared/filter/article/article-filter.module';
import { TitleModule } from 'src/app/shared/layout/title/title.module';
import { TableModule } from 'src/app/shared/widgets/table/table.module';
import { ArticleAdminOverviewRoutingModule } from './article-admin-overview-routing.module';
import { ArticleAdminOverviewComponent } from './component/article-admin-overview.component';
import { articleAdminOverviewStateKey } from './constants/article-admin-overview.constants';
import { ArticleAdminOverviewEffects } from './state/article-portal-overview.effects';
import { articleAdminOverviewReducer } from './state/article-portal-overview.reducer';

const components = [
  ArticleAdminOverviewComponent
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
  ArticleFilterModule,
  ArticleAdminOverviewRoutingModule,
  TableModule,
  TitleModule,
];

const libs = [
  StoreModule.forFeature(articleAdminOverviewStateKey, articleAdminOverviewReducer),
  EffectsModule.forFeature([ArticleAdminOverviewEffects]),
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
export class ArticleAdminOverviewModule { }
