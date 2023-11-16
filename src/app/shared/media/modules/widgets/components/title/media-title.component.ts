import { Component, Input } from '@angular/core';
import { Maybe, MediaEntity } from 'src/app/core/api/generated/schema';

@Component({
  selector: 'app-media-title',
  templateUrl: './media-title.component.html',
  styleUrls: ['./media-title.component.scss']
})
export class MediaTitleComponent {

  @Input()
  public media?: Maybe<MediaEntity>;

}
