import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Maybe, MediaEntity } from 'src/schema/schema';
import { isValidYoutubeUrl } from '../../utils/media.utils';

@Component({
  selector: 'app-media-video',
  templateUrl: './media-video.component.html',
  styleUrls: ['./media-video.component.scss'],
})
export class MediaVideoComponent implements OnInit, OnChanges {
  
  @Input()
  public media?: Maybe<MediaEntity>;

  public videoElement?: HTMLVideoElement;

  @ViewChild('video') set elementRef(content: ElementRef) {
    if (content) {
      this.videoElement = content.nativeElement;
    }
  }

  public isYoutube = false;

  public url?: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer) { }

  public ngOnInit(): void {
    this.isYoutube = isValidYoutubeUrl(this.media?.url);

    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.media?.url as string);
  }

  public ngOnChanges(): void {
    this.isYoutube = isValidYoutubeUrl(this.media?.url);
    
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.media?.url as string);
    if (this.videoElement) {
      this.videoElement.load();
    }
  }

}
