import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CardSliderComponent } from 'src/app/shared/widgets/sliders/card-slider/card-slider.component';
import { AuthorEmbeddingComponent } from './component/author-embedding.component';
import { authorEmbeddingStateKey } from './constants/author-embedding.constants';
import { AuthorEmbeddingEffects } from './state/author-embedding.effects';
import { authorEmbeddingReducer } from './state/author-embedding.reducer';

const components = [
  AuthorEmbeddingComponent
];

const framework = [
  CommonModule,
];

const modules = [
  CoreModule,
  CardSliderComponent,
];

const libs = [
  StoreModule.forFeature(authorEmbeddingStateKey, authorEmbeddingReducer),
  EffectsModule.forFeature([AuthorEmbeddingEffects]),
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
export class AuthorEmbeddingModule { }
