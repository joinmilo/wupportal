import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CardSliderComponent } from 'src/app/shared/widgets/sliders/card-slider/card-slider.component';
import { OrganisationEmbeddingComponent } from './component/organisation-embedding.component';
import { organisationEmbeddingStateKey } from './constants/organisation-embedding.constants';
import { OrganisationEmbeddingEffects } from './state/organisation-embedding.effects';
import { organisationEmbeddingReducer } from './state/organisation-embedding.reducer';

const components = [
  OrganisationEmbeddingComponent
];

const framework = [
  CommonModule,
];

const modules = [
  CoreModule,
  CardSliderComponent,
];

const libs = [
  StoreModule.forFeature(organisationEmbeddingStateKey, organisationEmbeddingReducer),
  EffectsModule.forFeature([OrganisationEmbeddingEffects]),
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
export class OrganisationEmbeddingModule { }
