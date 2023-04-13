import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Column } from '../typings/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input()
  public data?: Observable<any>;

  @Input()
  public columns?: Column[];

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  @ViewChild(MatSort)
  public sort!: MatSort;

}