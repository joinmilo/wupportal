import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ArticleAdminRoutingModule } from '../features/article/admin/article-admin-routing.module';
import { AdminRoutingModule } from './admin-routing.module';
import { adminStateKey } from './constants/admin.constants';
import { AdminEffects } from './state/admin.effects';
import { adminReducer } from './state/admin.reducer';

const framework = [
  CommonModule,
];

const routes = [
  ArticleAdminRoutingModule,
  AdminRoutingModule, //TODO: always last entry duet to order and redirect to 404, Remove 404 and put in AppRouter
]

const libs = [
  StoreModule.forFeature(adminStateKey, adminReducer),
  EffectsModule.forFeature([AdminEffects]),
];

@NgModule({
  imports: [
    ...framework,
    ...libs,
    ...routes,
  ],
})
export class AdminModule { }
