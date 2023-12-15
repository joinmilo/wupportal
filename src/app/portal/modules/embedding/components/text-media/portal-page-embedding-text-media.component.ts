import { Component, Input } from '@angular/core';
import { Maybe, PageEmbeddingEntity } from 'src/app/core/api/generated/schema';

@Component({
  selector: 'app-portal-page-embedding-text-media',
  templateUrl: './portal-page-embedding-text-media.component.html',
  styleUrls: ['./portal-page-embedding-text-media.component.scss'],
})
export class PortalPageEmbeddingTextMediaComponent {
  
  @Input({ required: true })
  public embeddings?: Maybe<Maybe<PageEmbeddingEntity>[]>;

}
