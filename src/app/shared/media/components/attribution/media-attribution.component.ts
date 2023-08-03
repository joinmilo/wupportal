import { Component, Input } from '@angular/core';
import { Maybe, MediaAttributionEntity } from 'src/schema/schema';

@Component({
  selector: 'app-media-attribution',
  templateUrl: './media-attribution.component.html',
  styleUrls: ['./media-attribution.component.scss'],
})
export class MediaAttributionComponent {

  @Input()
  public attribution?: Maybe<MediaAttributionEntity>;

}
