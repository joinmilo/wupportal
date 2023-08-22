import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CardSliderComponent } from 'src/app/shared/widgets/sliders/card-slider/card-slider.component';
import { EventEmbeddingComponent } from './component/event-embedding.component';
import { eventEmbeddingStateKey } from './constants/event-embedding.constants';
import { EventEmbeddingEffects } from './state/event-embedding.effects';
import { eventEmbeddingReducer } from './state/event-embedding.reducer';

const components = [
  EventEmbeddingComponent
];

const framework = [
  CommonModule,
];

const modules = [
  CoreModule,
  CardSliderComponent,
];

const libs = [
  StoreModule.forFeature(eventEmbeddingStateKey, eventEmbeddingReducer),
  EffectsModule.forFeature([EventEmbeddingEffects]),
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
export class EventEmbeddingModule { }
