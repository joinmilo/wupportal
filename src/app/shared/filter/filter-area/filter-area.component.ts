import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { collapse } from 'src/app/core/animations/animations';
import { CoreModule } from 'src/app/core/core.module';
import { Maybe } from 'src/schema/schema';

@Component({
  selector: 'app-filter-area',
  templateUrl: './filter-area.component.html',
  styleUrls: ['./filter-area.component.scss'],
  animations: [
     collapse()
  ],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,

    FontAwesomeModule,

    MatCardModule,
    MatButtonModule,
  ]
})
export class FilterAreaComponent {

  @Input()
  public filtersActive?: Maybe<boolean>;

  @Output()
  public filtersCleared = new EventEmitter<void>();

  public filtersCollapsed = true;

  public clearFilters(): void {
    this.filtersCleared.emit();
  }

}