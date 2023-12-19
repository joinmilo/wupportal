import { Component, Input, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Maybe, PageEmbeddingEntity, PluginEntity } from 'src/app/core/api/generated/schema';
import { articlesFeatureKey, authorsFeatureKey, calendarFeatureKey, contestsFeatureKey, dealsFeatureKey, eventsFeatureKey, formsFeatureKey, guestArticlesFeatureKey, mapFeatureKey, mediaFeatureKey, organisationsFeatureKey, reportsFeatureKey, surveysFeatureKey } from 'src/app/core/constants/feature.constants';
import { GetPluginGQL } from '../../../../api/generated/get-plugin.query.generated';
import { mapEmbeddingToAttributes } from '../../utils/portal-page-embeddings.utils';

@Component({
  selector: 'app-portal-page-embedding-plugin',
  templateUrl: './portal-page-embedding-plugin.component.html',
  styleUrls: ['./portal-page-embedding-plugin.component.scss'],
})
export class PortalPageEmbeddingPluginComponent implements OnDestroy {
  
  @Input({ required: true })
  public set embedding(embedding: Maybe<PageEmbeddingEntity>) {
    this.getPluginService.watch({
      entity: {
        id: mapEmbeddingToAttributes(embedding)?.plugin?.id
      }
    }).valueChanges
    .pipe(takeUntil(this.destroy))
    .subscribe(response => this.plugin = response.data.getPlugin)
  }

  public plugin?: Maybe<PluginEntity>;

  private destroy = new Subject<void>();

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

  constructor(
    private getPluginService: GetPluginGQL,
  ) { }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
