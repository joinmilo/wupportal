import { Component, Input } from '@angular/core';
import { Maybe, MediaEntity, PageAttributeEntity, PageEmbeddingEntity } from 'src/app/core/api/generated/schema';

type TextMediaElement = {
  button?: Maybe<PageAttributeEntity>, 
  media?: Maybe<MediaEntity>,
  title?: Maybe<PageAttributeEntity>,
  text?: Maybe<PageAttributeEntity>,
}

@Component({
  selector: 'app-portal-page-embedding-text-media',
  templateUrl: './portal-page-embedding-text-media.component.html',
  styleUrls: ['./portal-page-embedding-text-media.component.scss'],
})
export class PortalPageEmbeddingTextMediaComponent {
  
  @Input({ required: true })
  public set embeddings(embeddings: Maybe<Maybe<PageEmbeddingEntity>[]>) {
    if (embeddings) {
      this.elements = embeddings?.map(embedding => {
        return embedding?.attributes?.reduce((obj, attribute) => {
          switch(attribute?.type?.code) {
            case 'button':
              return {...obj, button: attribute };
            case 'media':
              return {...obj, media: attribute.references?.[0]?.media };
            case 'text':
              return {...obj, text: attribute }
            default:
              return {...obj, title: attribute };
          }
        }, {}) as TextMediaElement
      });
    }
  }

  public elements: TextMediaElement[] = [];

}
