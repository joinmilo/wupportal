import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CoreModule } from 'src/app/core/core.module';
import { ArticleAdminFormRoutingModule } from './article-admin-form-routing.module';
import { ArticleAdminFormComponent } from './components/article-admin-form.component';

const components = [
  ArticleAdminFormComponent
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
  ArticleAdminFormRoutingModule,
];

// const libs = [
//   StoreModule.forFeature(articleAdminOverviewStateKey, articleAdminOverviewReducer),
//   EffectsModule.forFeature([ArticleAdminOverviewEffects]),
// ];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    // ...libs,
    ...materials,
    ...modules,
  ],
  exports: [...components],
})
export class ArticleAdminFormModule { }
