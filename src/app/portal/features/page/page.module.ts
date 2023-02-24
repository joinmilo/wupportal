/* eslint-disable  @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { PortalCommonModule } from '../../common/common.module';
import { PageEventFeatureComponent } from './components/event-feature/page-event-feature.component';
import { PageFeaturesComponent } from './components/features/page-features.component';
import { PageLandingComponent } from './components/landing/page-landing.component';
import { PageComponent } from './components/page/page.component';
import { pageFeatureKey } from './constants/page.constants';
import { PagePortalRoutingModule } from './page-routing.module';
import { PageEffects } from './state/page.effects';
import { pageReducer } from './state/page.reducer';

const components: Type<any>[] = [
  PageComponent,
  PageEventFeatureComponent,
  PageFeaturesComponent,
  PageLandingComponent,
];

const framework: Type<any>[] = [
  CommonModule,
];

const materials: Type<any>[] = [
  MatButtonModule,
  MatToolbarModule,
];

const modules: Type<any>[] = [
  CoreModule,
  PagePortalRoutingModule,
  PortalCommonModule,
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
