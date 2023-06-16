import { Component, Input, OnInit } from '@angular/core';
import { articlesFeatureKey, authorsFeatureKey, calendarFeatureKey, contestsFeatureKey, dealsFeatureKey, eventsFeatureKey, formsFeatureKey, guestArticlesFeatureKey, mapFeatureKey, mediaFeatureKey, organisationsFeatureKey, reportsFeatureKey, surveysFeatureKey } from 'src/app/core/constants/core.constants';
import { Maybe, PageFeatureEntity } from 'src/schema/schema';

@Component({
  selector: 'app-portal-page-features',
  templateUrl: './portal-page-features.component.html',
  styleUrls: ['./portal-page-features.component.scss']
})
export class PortalPageFeaturesComponent implements OnInit {

  @Input()
  public pageFeatures?: Maybe<Maybe<PageFeatureEntity>[]>;

  public features = {
    articles: articlesFeatureKey,
    authors: authorsFeatureKey,
    calendar: calendarFeatureKey,
    contests: contestsFeatureKey,
    deals: dealsFeatureKey,
    events: eventsFeatureKey,
    forms: formsFeatureKey,
    guestArticle: guestArticlesFeatureKey,
    map: mapFeatureKey,
    media: mediaFeatureKey,
    organisations: organisationsFeatureKey,
    reports: reportsFeatureKey,
    surveys: surveysFeatureKey,
  }

  public ngOnInit(): void {
    this.pageFeatures = [...(this.pageFeatures || [])].sort((f1, f2) => (f1?.order || 0) - (f2?.order || 0));
  }
  
}
