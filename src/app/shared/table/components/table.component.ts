import { Component, Input } from '@angular/core';
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

}