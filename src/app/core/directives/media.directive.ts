import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Maybe, MediaEntity } from 'src/schema/schema';
import { mediaApi } from '../constants/core.constants';

@Directive({
  selector: '[appMedia]'
})
export class MediaDirective implements OnChanges {

  @Input()
  @HostBinding('src')
  public src?: string;

  @Input()
  public appMedia?: Maybe<MediaEntity>;

  constructor(private elemRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && (changes['appMedia'] || changes['src'])) {
      this.url();
    }
  }

  private url(): void {
    if (this.appMedia?.id) {
      this.src = mediaApi(this.appMedia);

      if (this.elemRef.nativeElement?.parentElement?.tagName === 'VIDEO') {
        // When dynamically changing video URL,
        // Angular won't update the video src unless we call load()
        this.elemRef.nativeElement?.parentElement?.load();
      }
    }
  }

}
