import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CardSliderComponent } from 'src/app/shared/widgets/sliders/card-slider/card-slider.component';
import { SurveyEmbeddingComponent } from './component/survey-embedding.component';
import { surveyEmbeddingStateKey } from './constants/survey-embedding.constants';
import { SurveyEmbeddingEffects } from './state/survey-embedding.effects';
import { surveyEmbeddingReducer } from './state/survey-embedding.reducer';

const components = [
  SurveyEmbeddingComponent
];

const framework = [
  CommonModule,
];

const modules = [
  CoreModule,
  CardSliderComponent,
];

const libs = [
  StoreModule.forFeature(surveyEmbeddingStateKey, surveyEmbeddingReducer),
  EffectsModule.forFeature([SurveyEmbeddingEffects]),
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
export class SurveyEmbeddingModule { }
