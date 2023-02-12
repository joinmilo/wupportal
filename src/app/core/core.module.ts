/* eslint-disable  @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { IconComponent } from './components/icon/icon.component';
import { CoreEffects } from './state/core.effects';
import * as fromCore from './state/core.reducer';

const components: Type<any>[] = [
  FeedbackComponent,
  IconComponent,
];

const framework: Type<any>[] = [
  CommonModule,
  RouterModule,
];

const materials: Type<any>[] = [
  MatSnackBarModule,
];

const libs: any = [
  StoreModule.forFeature(fromCore.coreFeatureKey, fromCore.reducer),
  EffectsModule.forFeature([CoreEffects]),
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...materials,
    ...libs,
  ],
  exports: [
    ...components,
  ],
  providers: [
  ],
})
export class CoreModule { }
