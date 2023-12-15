import { Component, Input } from '@angular/core';
import { Maybe } from 'src/app/core/api/generated/schema';

@Component({
  selector: 'app-sub-title',
  templateUrl: './sub-title.component.html',
  styleUrls: ['./sub-title.component.scss']
})
export class SubTitleComponent {

  @Input()
  public titleLabel?: Maybe<string>;

  @Input()
  public title?: Maybe<string>;

  @Input()
  public link?: string[];

}
