import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { FilterTargetgroupComponent } from './components/event-targetgroup/filter-targetgroup.component';
import { filterStateKey } from './constants/filter.constants';
import { FilterEffects } from './state/filter.effects';
import { filterReducer } from './state/filter.reducer';

const components = [
  FilterTargetgroupComponent
];

const framework = [
  CommonModule,
  ReactiveFormsModule,
];

const materials = [
  MatFormFieldModule,
  MatSelectModule,
];

const modules = [
  CoreModule,
];

const libs = [
  StoreModule.forFeature(filterStateKey, filterReducer),
  EffectsModule.forFeature([FilterEffects]),
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...materials,
    ...modules,
    ...libs,
  ],
  exports: [...components],
})
export class FilterModule { }