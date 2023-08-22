import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CardSliderComponent } from 'src/app/shared/widgets/sliders/card-slider/card-slider.component';
import { FormEmbeddingComponent } from './component/form-embedding.component';
import { formEmbeddingStateKey } from './constants/form-embedding.constants';
import { FormEmbeddingEffects } from './state/form-embedding.effects';
import { formEmbeddingReducer } from './state/form-embedding.reducer';

const components = [
  FormEmbeddingComponent
];

const framework = [
  CommonModule,
];

const modules = [
  CoreModule,
  CardSliderComponent,
];

const libs = [
  StoreModule.forFeature(formEmbeddingStateKey, formEmbeddingReducer),
  EffectsModule.forFeature([FormEmbeddingEffects]),
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
export class FormEmbeddingModule { }
