/* eslint-disable  @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CardComponent } from './components/card/card.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { IconComponent } from './components/icon/icon.component';
import { ImageComponent } from './components/image/image.component';
import { LogoComponent } from './components/logo/logo.component';
import { AddressPieceComponent } from './components/pieces/adress/address-piece.component';
import { DatePieceComponent } from './components/pieces/date/date-piece.component';
import { coreFeatureKey } from './constants/core.constants';
import { AddressPipe } from './pipes/address/address.pipe';
import { TranslatablePipe } from './pipes/translatable/translatable.pipe';
import { CoreEffects } from './state/core.effects';
import { coreReducer } from './state/core.reducer';

const components: Type<any>[] = [
  AddressPieceComponent,
  CardComponent,
  DatePieceComponent,
  FeedbackComponent,
  IconComponent,
  ImageComponent,
  LogoComponent,
];

const pipes: Type<any>[] = [
  AddressPipe,
  TranslatablePipe,
]

const framework: Type<any>[] = [
  CommonModule,
  RouterModule,
];

const materials: Type<any>[] = [
  MatCardModule,
  MatSnackBarModule,
];

const libs: any = [
  StoreModule.forFeature(coreFeatureKey, coreReducer),
  EffectsModule.forFeature([CoreEffects]),
];

@NgModule({
  declarations: [
    ...components,
    ...pipes,
  ],
  imports: [
    ...framework,
    ...materials,
    ...libs,
  ],
  exports: [
    ...components,
    ...pipes,
  ],
})
export class CoreModule { }
