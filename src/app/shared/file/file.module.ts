import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core/core.module';
import { SliderHeaderComponent } from '../sliders/slider-header/slider-header.component';
import { SliderComponent } from '../sliders/slider/slider.component';
import { TitleModule } from '../title/title.module';
import { FileCardComponent } from './components/card/file-card.component';
import { FileSliderComponent } from './components/slider/file-slider.component';
import { FileUploadFormComponent } from './components/upload/file-upload-form.component';


const components = [
  FileCardComponent,
  FileSliderComponent,
  FileUploadFormComponent,
];

const framework = [
  CommonModule,
  ReactiveFormsModule,
  RouterModule
];

const materials = [
  MatCardModule,
  MatButtonModule,
];

const modules = [
  CoreModule,
  SliderComponent,
  SliderHeaderComponent,
  TitleModule,
];

const libs = [
  FontAwesomeModule,
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
export class FileModule { }