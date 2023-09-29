import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core/core.module';
import { GridLayoutModule } from '../../layout/grid-layout/grid-layout.module';
import { RadioButtonFormModule } from '../radio-button/radio-button-form.module';
import { SchedulerFormComponent } from './components/form/scheduler-form.component';
import { SchedulerService } from './services/scheduler.service';

const components = [
  SchedulerFormComponent,
];

const framework = [
  CommonModule,
  ReactiveFormsModule,
];

const materials = [
  MatButtonModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
];

const modules = [
  CoreModule,
  GridLayoutModule,
  RadioButtonFormModule,
];

const libs = [
  FontAwesomeModule,
];

const providers = [
  SchedulerService
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...framework,
    ...materials,
    ...modules,
    ...libs,
  ],
  exports: [
    ...components,
  ],
  providers: [
    ...providers
  ]
})
export class SchedulerModule { }