import { Component, Input } from '@angular/core';
import { Maybe, PageEmbeddingEntity } from 'src/app/core/api/generated/schema';
import { articlesFeatureKey, authorsFeatureKey, calendarFeatureKey, contestsFeatureKey, dealsFeatureKey, eventsFeatureKey, formsFeatureKey, guestArticlesFeatureKey, mapFeatureKey, mediaFeatureKey, organisationsFeatureKey, reportsFeatureKey, surveysFeatureKey } from 'src/app/core/constants/feature.constants';
import { PageEmbeddingAttributes } from '../../typings/page-embedding';
import { mapEmbeddingsToAttributes } from '../../utils/portal-page-embeddings.utils';

@Component({
  selector: 'app-portal-page-embedding-plugin',
  templateUrl: './portal-page-embedding-plugin.component.html',
  styleUrls: ['./portal-page-embedding-plugin.component.scss'],
})
export class PortalPageEmbeddingPluginComponent {
  
  @Input({ required: true })
  public set embeddings(embeddings: Maybe<Maybe<PageEmbeddingEntity>[]>) {
    this.elements = mapEmbeddingsToAttributes(embeddings);
  }

  public elements?: Maybe<Maybe<PageEmbeddingAttributes>[]>;

  public features = {
    articles: articlesFeatureKey,
    authors: authorsFeatureKey,
    calendar: calendarFeatureKey,
    contests: contestsFeatureKey,
    deals: dealsFeatureKey,
    events: eventsFeatureKey,
    forms: formsFeatureKey,
    guestArticle: guestArticlesFeatureKey,
    media: mediaFeatureKey,
    map: mapFeatureKey,
    organisations: organisationsFeatureKey,
    reports: reportsFeatureKey,
    surveys: surveysFeatureKey,
  };

}
