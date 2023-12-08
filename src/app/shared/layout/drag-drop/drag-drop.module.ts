import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core/core.module';
import { DragDropComponent } from './component/drag-drop.component';
import { DragDropDirective } from './directive/drag-drop.directive';

const components = [
  DragDropComponent
];

const directives = [
  DragDropDirective,
]

const framework = [
  CommonModule,
  NgComponentOutlet,
];

const materials = [
  DragDropModule,
  MatButtonModule,
  MatCardModule,
];

const modules = [
  CoreModule,
  CommonModule,
];

const libs = [
  FontAwesomeModule,
];

@NgModule({
  declarations: [
    ...components,
    ...directives,
  ],
  imports: [
    ...framework,
    ...materials,
    ...modules,
    ...libs,
  ],
  exports: [
    ...components,
    ...directives,
  ],
})
export class DragAndDropModule { }
