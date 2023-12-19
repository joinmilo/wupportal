import { Component, Input } from '@angular/core';
import { Maybe, PageEmbeddingEntity } from 'src/app/core/api/generated/schema';
import { PageEmbeddingAttributes } from '../../typings/page-embedding';
import { mapEmbeddingsToAttributes } from '../../utils/portal-page-embeddings.utils';

@Component({
  selector: 'app-portal-page-embedding-media',
  templateUrl: './portal-page-embedding-media.component.html',
  styleUrls: ['./portal-page-embedding-media.component.scss'],
})
export class PortalPagEmbeddingMediaComponent {

  @Input({ required: true })
  public set embeddings(embeddings: Maybe<Maybe<PageEmbeddingEntity>[]>) {
    this.elements = mapEmbeddingsToAttributes(embeddings);
  }

  public elements: Maybe<Maybe<PageEmbeddingAttributes>[]> = [];

}
