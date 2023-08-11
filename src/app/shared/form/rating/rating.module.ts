import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitleModule } from 'src/app/shared/layout/title/title.module';
import { CoreModule } from "../../../core/core.module";
import { CaptchaModule } from '../captcha/captcha.module';
import { RatingDistributionComponent } from './components/distribution/rating-distribution.component';
import { RatingFormComponent } from './components/form/rating-form.component';
import { RatingComponent } from './components/rating.component';

const components = [
  RatingComponent,
  RatingFormComponent,
  RatingDistributionComponent
];

const framework = [
  CommonModule,
  RouterModule,
  CaptchaModule,
  TitleModule
];

const modules = [
  CoreModule,
];

const libs = [
  FontAwesomeModule,
];

const materials = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  MatProgressBarModule,
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
export class RatingModule { }