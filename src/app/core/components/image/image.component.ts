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

  @Input()
  public rounded = false;

  @Input()
  public src?: string;

  public get ref(): string {
    if (this.src) {
      return this.src;
    }

    if (this.image?.id) {
      return `${mediaBaseApi}/${this.image?.id}`;
    }

    return '/assets/placeholder.webp';
  }

}
