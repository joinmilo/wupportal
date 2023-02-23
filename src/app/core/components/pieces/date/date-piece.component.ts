import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-piece',
  templateUrl: './date-piece.component.html',
  styleUrls: ['./date-piece.component.scss']
})
export class DatePieceComponent {

  @Input()
  public date?: string;

  @Input()
  public dateTime = true;

}
