import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Maybe, PageEmbeddingEntity, PluginEntity } from 'src/app/core/api/generated/schema';
import { articlesFeatureKey, authorsFeatureKey, calendarFeatureKey, contestsFeatureKey, dealsFeatureKey, eventsFeatureKey, formsFeatureKey, guestArticlesFeatureKey, mapFeatureKey, mediaFeatureKey, organisationsFeatureKey, reportsFeatureKey, surveysFeatureKey } from 'src/app/core/constants/feature.constants';
import { GetPluginGQL } from '../../../../api/generated/get-plugin.query.generated';

@Component({
  selector: 'app-portal-page-embedding-plugin',
  templateUrl: './portal-page-embedding-plugin.component.html',
  styleUrls: ['./portal-page-embedding-plugin.component.scss'],
})
export class PortalPageEmbeddingPluginComponent implements OnInit, OnChanges {
  
  @Input({ required: true })
  public embedding?: Maybe<PageEmbeddingEntity>;

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

  public ngOnInit(): void {
    this.retrievePlugin(); 
  }

  public ngOnChanges(): void {
    this.retrievePlugin();
  }

  private retrievePlugin(): void {
    this.getPluginService.watch({
      entity: {
        id: this.embedding?.attributes?.[0]?.references?.[0]?.plugin?.id
      }
    }).valueChanges
    .pipe(takeUntil(this.destroy))
    .subscribe(response => this.plugin = response.data.getPlugin)
  }

}
