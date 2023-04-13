import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core/core.module';
import { TableDesktopComponent } from './components/desktop/table-desktop.component';
import { TableMobileComponent } from './components/mobile/table-mobile.component';
import { TableComponent } from './components/table.component';


const components = [
  TableComponent,
  TableDesktopComponent,
  TableMobileComponent,
];

const framework = [
  CommonModule,
  RouterModule,
];

const materials = [
  MatCardModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
];

const modules = [
  CoreModule,
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
export class TableModule { }