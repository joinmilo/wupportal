import { Component, Input } from '@angular/core';
import { Maybe, MediaEntity } from 'src/schema/schema';
import { mediaBaseApi } from '../../constants/core.constants';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  @Input()
  public image?: Maybe<MediaEntity>;

  public src = `${mediaBaseApi}/${this.image?.id}`;

}
