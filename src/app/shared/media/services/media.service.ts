import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Maybe, MediaEntity } from 'src/app/core/api/generated/schema';
import { MimeTypeDefinition } from '../typings/media';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  public fileToMedia(file: File): Observable<MediaEntity> {
    return new Observable(observer => {
      const reader = new FileReader();

      reader.onload = event => {
        console.log('here?', (event?.target?.result as string)?.split(',')[1]);
        observer.next({
          base64: (event?.target?.result as string)?.split(',')[1],
          mimeType: file.type,
          name: file.name,
          size: file.size,
          modified: file.lastModified,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)) as string,
        });
        observer.complete();
      };

      reader.onerror = (event) => {
        observer.error(event);
      };

      reader.readAsDataURL(file);
    });
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

