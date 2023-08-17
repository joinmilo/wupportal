import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { portalStateKey } from './constants/portal.constants';
import { PortalLayoutComponent } from './modules/layout/portal-layout.component';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalEffects } from './state/portal.effects';
import { portalReducer } from './state/portal.reducer';

const framework = [
  CommonModule,
  PortalRoutingModule,

  //TODO: Remove once Angular fixes lazy load error:
  
  MatNativeDateModule,
  MatSelectModule,
];

const modules = [
  PortalLayoutComponent,
];

const libs = [
  StoreModule.forFeature(portalStateKey, portalReducer),
  EffectsModule.forFeature([PortalEffects]),
]

@NgModule({
  imports: [
    ...framework,
    ...libs,
    ...modules,
  ],
})
export class PortalModule { }
