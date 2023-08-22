import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CardSliderComponent } from 'src/app/shared/widgets/sliders/card-slider/card-slider.component';
import { ContestEmbeddingComponent } from './component/contest-embedding.component';
import { contestEmbeddingStateKey } from './constants/contest-embedding.constants';
import { ContestEmbeddingEffects } from './state/contest-embedding.effects';
import { contestEmbeddingReducer } from './state/contest-embedding.reducer';

const components = [
  ContestEmbeddingComponent
];

const framework = [
  CommonModule,
];

const modules = [
  CoreModule,
  CardSliderComponent,
];

const libs = [
  StoreModule.forFeature(contestEmbeddingStateKey, contestEmbeddingReducer),
  EffectsModule.forFeature([ContestEmbeddingEffects]),
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
export class ContestEmbeddingModule { }
