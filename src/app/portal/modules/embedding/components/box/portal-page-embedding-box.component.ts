import { Component, Input } from '@angular/core';
import { Maybe, PageEmbeddingEntity } from 'src/app/core/api/generated/schema';
import { PageEmbeddingAttributes } from '../../typings/page-embedding';
import { mapEmbeddingsToAttributes } from '../../utils/portal-page-embeddings.utils';

@Component({
  selector: 'app-portal-page-embedding-box',
  templateUrl: './portal-page-embedding-box.component.html',
  styleUrls: ['./portal-page-embedding-box.component.scss'],
})
export class PortalPageEmbeddingBoxComponent {
  
  @Input({ required: true })
  public set embeddings(embeddings: Maybe<Maybe<PageEmbeddingEntity>[]>) {
    this.elements = mapEmbeddingsToAttributes(embeddings);
  }

  public elements: Maybe<Maybe<PageEmbeddingAttributes>[]> = [];

}
