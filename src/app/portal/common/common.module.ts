/* eslint-disable  @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from 'src/app/core/core.module';
import { PortalHeaderComponent } from './components/header/portal-header.component';
import { PortalMenuComponent } from './components/menu/portal-menu.component';
import { StoreModule } from '@ngrx/store';
import * as fromCommon from './state/common.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CommonEffects } from './state/common.effects';

const components: Type<any>[] = [
  PortalHeaderComponent,
  PortalMenuComponent,
];

const framework: Type<any>[] = [
  CommonModule,
];

const materials: Type<any>[] = [
  MatToolbarModule,
];

const modules: Type<any>[] = [
  CoreModule,
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...materials,
    ...modules,
    StoreModule.forFeature(fromCommon.commonFeatureKey, fromCommon.reducer),
    EffectsModule.forFeature([CommonEffects]),
  ],
  exports: [
    ...components,
  ],
})
export class PortalCommonModule { }
