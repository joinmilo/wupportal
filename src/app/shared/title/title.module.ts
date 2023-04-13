import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { SubTitleComponent } from './components/sub-title/sub-title.component';


const components = [
  PageTitleComponent,
  SubTitleComponent,
];

const framework = [
  CommonModule,
  RouterModule,
];

const materials = [
  MatCardModule,
  MatButtonModule,
  MatChipsModule,
];

const modules = [
  CoreModule,
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...materials,
    ...modules,
  ],
  exports: [...components],
})
export class TitleModule { }