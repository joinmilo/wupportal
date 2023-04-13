import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Column } from '../../typings/table';

@Component({
  selector: 'app-table-desktop',
  templateUrl: './table-desktop.component.html',
  styleUrls: ['./table-desktop.component.scss']
})
export class TableDesktopComponent {

  @Input()
  public data?: Observable<any>;

  @Input()
  public columns?: Column[];

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  @ViewChild(MatSort)
  public sort!: MatSort;
  
  constructor(
  ) { }

}