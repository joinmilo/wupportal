import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CardSliderComponent } from 'src/app/shared/widgets/sliders/card-slider/card-slider.component';
import { DealEmbeddingComponent } from './component/deal-embedding.component';
import { dealEmbeddingStateKey } from './constants/deal-embedding.constants';
import { DealEmbeddingEffects } from './state/deal-embedding.effects';
import { dealEmbeddingReducer } from './state/deal-embedding.reducer';

const components = [
  DealEmbeddingComponent
];

const framework = [
  CommonModule,
];

const modules = [
  CoreModule,
  CardSliderComponent,
];

const libs = [
  StoreModule.forFeature(dealEmbeddingStateKey, dealEmbeddingReducer),
  EffectsModule.forFeature([DealEmbeddingEffects]),
]

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...modules,
    ...libs,
  ],
  exports: [...components],
})
export class DealEmbeddingModule { }
