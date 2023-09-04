import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Maybe, MediaEntity } from 'src/app/core/api/generated/schema';
import { MimeTypeDefinition } from '../typings/media';

@Injectable()
export class MediaService {

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  public fileToMedia(file?: Maybe<File>) {
    return {
      mimeType: (file as File).type,
      name: (file as File).name,
      size: (file as File).size,
      modified: (file as File).lastModified,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL((file as File)))
    } as MediaEntity;
  }

  public mimeTypeDefinition(element?: Maybe<MediaEntity>): Maybe<MimeTypeDefinition> {
    if (element?.mimeType?.includes('audio')) {
      return 'AUDIO';
    } else if (element?.mimeType?.includes('image')) {
      return 'IMAGE';
    } else if (element?.mimeType?.includes('video')) {
      return 'VIDEO';
    } else if (element?.mimeType?.includes('pdf')) {
      return 'PDF';
    } else if (element?.extension?.includes('doc')) {
      return 'WORD';
    }
    return null;
  }

  public isValidYoutubeUrl(url?: Maybe<string>): boolean {
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]{11})/;
    return !!url && youtubeRegex.test(url);
  }

  public getUrlHost(url: string): string {
    const location = new URL(url);
    return location.hostname;
  }

}

