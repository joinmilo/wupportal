/* eslint-disable  @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { PortalPageComponent } from './components/page/page.component';
import { pageFeatureKey } from './constants/page.constants';
import { PagePortalRoutingModule } from './page-routing.module';
import { PageEffects } from './state/page.effects';
import { pageReducer } from './state/page.reducer';

const components: Type<any>[] = [
  PortalPageComponent
];

const framework: Type<any>[] = [
  CommonModule,
];

const materials: Type<any>[] = [
  MatToolbarModule,
];

const modules: Type<any>[] = [
  CoreModule,
  PagePortalRoutingModule,
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...materials,
    ...modules,
    StoreModule.forFeature(pageFeatureKey, pageReducer),
    EffectsModule.forFeature([PageEffects]),
  ],
})
export class PagePortalModule { }
