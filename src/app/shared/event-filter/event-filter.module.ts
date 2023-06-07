import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { EventFilterCategoryComponent } from './components/category/event-filter-category.component';
import { EventFilterComponent } from './components/event-filter.component';
import { EventFilterFreeOnlyComponent } from './components/free-only/event-filter-free-only.component';
import { EventFilterTargetgroupComponent } from './components/targetgroup/event-filter-targetgroup.component';
import { eventFilterStateKey } from './constants/event-filter.constants';
import { EventFilterEffects } from './state/event-filter.effects';
import { eventFilterReducer } from './state/event-filter.reducer';

const components = [
  EventFilterComponent,
  EventFilterCategoryComponent,
  EventFilterFreeOnlyComponent,
  EventFilterTargetgroupComponent,
];

const framework = [
  CommonModule,
  ReactiveFormsModule,
];

const materials = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSelectModule,
];

const modules = [
  CoreModule,
];

const libs = [
  FontAwesomeModule,
  StoreModule.forFeature(eventFilterStateKey, eventFilterReducer),
  EffectsModule.forFeature([EventFilterEffects]),
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
export class EventFilterModule { }