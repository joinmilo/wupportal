import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CaptchaModule } from '../captcha/captcha.module';
import { FormRowComponent } from './components/row/form-row.component';
import { FormStepComponent } from './components/step/form-step.component';
import { FormStepperComponent } from './components/stepper/form-stepper.component';
import { formStepperStateKey } from './constants/form-stepper.constants';
import { FormStepperColumnDirective } from './directives/form-stepper-column';
import { formStepperReducer } from './state/form-stepper.reducer';

const components = [
  FormRowComponent,
  FormStepperComponent,
  FormStepComponent,
];

const directives = [
  FormStepperColumnDirective,
]

const framework = [
  CommonModule,
  ReactiveFormsModule,
];

const materials = [
  MatButtonModule,
  MatDividerModule,
  MatExpansionModule,
];

const modules = [
  CaptchaModule,
  CoreModule,
];

const libs = [
  FontAwesomeModule,
  StoreModule.forFeature(formStepperStateKey, formStepperReducer),
];

@NgModule({
  declarations: [
    ...components,
    ...directives
  ],
  imports: [
    ...framework,
    ...materials,
    ...modules,
    ...libs,
  ],
  exports: [
    ...components,
    ...directives
  ],
})
export class FormStepperModule { }