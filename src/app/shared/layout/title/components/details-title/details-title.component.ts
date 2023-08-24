import { Component, Input } from '@angular/core';
import { Maybe } from 'src/app/core/api/generated/schema';

@Component({
  selector: 'app-details-title',
  templateUrl: './details-title.component.html',
  styleUrls: ['./details-title.component.scss']
})
export class DetailsTitleComponent {

  @Input()
  public title?: Maybe<string>;

  @Input()
  public titleLabel?: Maybe<string>;

}
