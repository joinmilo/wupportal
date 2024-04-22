import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { DateRangeFilterComponent, FilterAreaComponent, FilterService } from 'ngx-cinlib/filters';
import { I18nDirective } from 'ngx-cinlib/i18n';
import { CoreModule } from 'src/app/core/core.module';
import { SuburbFilterModule } from '../suburb/suburb-filter.module';
import { SurveyFilterPastComponent } from './components/past/survey-filter-past.component';
import { SurveyFilterComponent } from './components/survey-filter.component';

const components = [
  SurveyFilterComponent,
  SurveyFilterPastComponent,
];

const framework = [
  CommonModule,
  ReactiveFormsModule,
];

const materials = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatSelectModule,
];

const modules = [
  CoreModule,
  SuburbFilterModule,
];

const libs = [
  DateRangeFilterComponent,
  FilterAreaComponent,
  I18nDirective,
];

const providers = [
  FilterService,
]
@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...materials,
    ...modules,
    ...libs,
  ],
  exports: [...components],
  providers: [...providers],
})
export class SurveyFilterModule { }