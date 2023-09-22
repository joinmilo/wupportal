import { Component, Input } from '@angular/core';
import { MediaEntity } from 'src/app/core/api/generated/schema';

@Component({
  selector: 'app-table-boolean-row',
  template: `
    <button mat-button>
      <fa-icon *ngIf="media"
        [icon]="['fas', 'image']">
      </fa-icon>
    </button>
  `,
})
export class TableRowMediaComponent {

  @Input()
  public media?: MediaEntity;
}
