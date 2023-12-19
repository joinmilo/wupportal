import { Component, Input } from '@angular/core';
import { Maybe, PageEmbeddingEntity, PageEmbeddingTypeEntity } from 'src/app/core/api/generated/schema';

type GroupedEmbeddings = {
  type?: Maybe<PageEmbeddingTypeEntity>,
  embeddings: Maybe<Maybe<PageEmbeddingEntity>[]>,
};

@Component({
  selector: 'app-portal-page-embedding',
  templateUrl: './portal-page-embedding.component.html',
  styleUrls: ['./portal-page-embedding.component.scss'],
})
export class PortalPageEmbeddingComponent {

  @Input({ required: true })
  public set embeddings(embeddings: Maybe<Maybe<PageEmbeddingEntity>[]>) {
    this.init(embeddings);
  }

  public groups: GroupedEmbeddings[] = [];

  private init(embeddings: Maybe<Maybe<PageEmbeddingEntity>[]>): void {
    this.groups = [];
    const sorted = [...(embeddings || [])].sort((f1, f2) => (f1?.order || 0) - (f2?.order || 0));

    sorted.forEach(embedding => {
      const last = this.groups[this.groups.length - 1];
      last && last.type?.id === embedding?.type?.id
        ? last.embeddings?.push(embedding as PageEmbeddingEntity)
        : this.groups.push({
            type: embedding?.type as PageEmbeddingTypeEntity,
            embeddings: [embedding] as PageEmbeddingEntity[],
          });
    });
  }

}
