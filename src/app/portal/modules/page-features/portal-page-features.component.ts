import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { articlesFeatureKey, authorsFeatureKey, calendarFeatureKey, contestsFeatureKey, dealsFeatureKey, eventsFeatureKey, formsFeatureKey, guestArticlesFeatureKey, mapFeatureKey, mediaFeatureKey, organisationsFeatureKey, reportsFeatureKey, surveysFeatureKey } from 'src/app/core/constants/core.constants';
import { ArticlePageFeatureModule } from 'src/app/features/article/page-feature/article-page-feature.module';
import { PortalAuthorPageFeatureModule } from 'src/app/features/author/portal/page-feature/portal-author-page-feature.module';
import { PortalCalendarPageFeatureModule } from 'src/app/features/calendar/portal/page-feature/portal-calendar-page-feature.module';
import { PortalContestPageFeatureModule } from 'src/app/features/contest/portal/page-feature/portal-contest-page-feature.module';
import { PortalDealPageFeatureModule } from 'src/app/features/deal/portal/page-feature/portal-deal-page-feature.module';
import { PortalEventPageFeatureModule } from 'src/app/features/event/portal/page-feature/portal-event-page-feature.module';
import { PortalFormPageFeatureModule } from 'src/app/features/form/portal/page-feature/portal-form-page-feature.module';
import { PortalGuestArticlePageFeatureModule } from 'src/app/features/guest-article/portal/page-feature/guest-portal-article-page-feature.module';
import { PortalMapPageFeatureModule } from 'src/app/features/map/portal/page-feature/portal-map-page-feature.module';
import { PortalMediaPageFeatureModule } from 'src/app/features/media/portal/page-feature/portal-media-page-feature.module';
import { PortalOrganisationPageFeatureModule } from 'src/app/features/organisation/portal/page-feature/portal-organisation-page-feature.module';
import { PortalReportPageFeatureModule } from 'src/app/features/report/portal/page-feature/portal-report-page-feature.module';
import { PortalSurveyPageFeatureModule } from 'src/app/features/survey/portal/page-feature/portal-survey-page-feature.module';
import { Maybe, PageFeatureEntity } from 'src/schema/schema';

@Component({
  selector: 'app-portal-page-features',
  templateUrl: './portal-page-features.component.html',
  styleUrls: ['./portal-page-features.component.scss'],
  standalone: true,
  imports: [
    CommonModule,

    ArticlePageFeatureModule,
    PortalAuthorPageFeatureModule,
    PortalCalendarPageFeatureModule,
    PortalContestPageFeatureModule,
    PortalDealPageFeatureModule,
    PortalEventPageFeatureModule,
    PortalFormPageFeatureModule,
    PortalGuestArticlePageFeatureModule,
    PortalMapPageFeatureModule,
    PortalMediaPageFeatureModule,
    PortalOrganisationPageFeatureModule,
    PortalReportPageFeatureModule,
    PortalSurveyPageFeatureModule,
  ],
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
    media: mediaFeatureKey,
    map: mapFeatureKey,
    organisations: organisationsFeatureKey,
    reports: reportsFeatureKey,
    surveys: surveysFeatureKey,
  }

  public ngOnInit(): void {
    this.pageFeatures = [...(this.pageFeatures || [])].sort((f1, f2) => (f1?.order || 0) - (f2?.order || 0));
  }

}
