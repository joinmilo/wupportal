import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CardModule } from 'src/app/shared/widgets/card/card.module';
import { ShareModule } from 'src/app/shared/widgets/share/share.module';
import { FavoriteComponent } from '../favorite/favorite.component';
import { TableActionsComponent } from './components/actions/table-actions.component';
import { TableCardComponent } from './components/card/table-card.component';
import { TableDesktopComponent } from './components/desktop/table-desktop.component';
import { TableMobileComponent } from './components/mobile/table-mobile.component';
import { TablePaginatorComponent } from './components/paginator/table-paginator.component';
import { TableRowBooleanComponent } from './components/rows/table-row-boolean.component';
import { TableRowColorComponent } from './components/rows/table-row-color.component';
import { TableRowIconComponent } from './components/rows/table-row-icon.component';
import { TableRowMediaComponent } from './components/rows/table-row-media.component';
import { TableSortComponent } from './components/sort/table-sort.component';
import { TableComponent } from './components/table.component';
import { tableStateKey } from './constants/table.constants';
import { RowDirective } from './directives/table-row.directive';
import { TablePaginatorService } from './services/table-paginator.service';
import { TableEffects } from './state/table.effects';
import { tableReducer } from './state/table.reducer';

const exportComponents = [
  TableComponent,
  TableCardComponent,
  TablePaginatorComponent,
  TableSortComponent,
];

const components = [
  TableActionsComponent,
  TableDesktopComponent,
  TableRowBooleanComponent,
  TableRowColorComponent,
  TableRowIconComponent,
  TableRowMediaComponent,
  TableMobileComponent,
];

const directives = [
  RowDirective,
];

const framework = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];

const materials = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatDividerModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
];

const modules = [
  CardModule,
  CoreModule,
  FavoriteComponent,
  ShareModule,
];

const libs = [
  FontAwesomeModule,
  StoreModule.forFeature(tableStateKey, tableReducer),
  EffectsModule.forFeature([TableEffects]),
];

const providers = [
  {
    provide: MatPaginatorIntl,
    useClass: TablePaginatorService,
  }
]

@NgModule({
  declarations: [
    ...components,
    ...exportComponents,
    ...directives,
  ],
  imports: [
    ...framework,
    ...materials,
    ...modules,
    ...libs,
  ],
  exports: [
    ...exportComponents,
    ...directives,
  ],
  providers: [
    ...providers
  ]
})
export class TableModule { }