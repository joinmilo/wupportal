import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { articlesFeatureKey, authorsFeatureKey, calendarFeatureKey, contestsFeatureKey, dealsFeatureKey, eventsFeatureKey, formsFeatureKey, guestArticlesFeatureKey, mapFeatureKey, mediaFeatureKey, organisationsFeatureKey, reportsFeatureKey, surveysFeatureKey } from 'src/app/core/constants/core.constants';
import { ArticleEmbeddingModule } from 'src/app/features/article/embedding/article-embedding.module';
import { AuthorEmbeddingModule } from 'src/app/features/author/embedding/author-embedding.module';
import { CalendarEmbeddingModule } from 'src/app/features/calendar/embedding/calendar-embedding.module';
import { ContestEmbeddingModule } from 'src/app/features/contest/embedding/contest-embedding.module';
import { DealEmbeddingModule } from 'src/app/features/deal/embedding/deal-embedding.module';
import { EventEmbeddingModule } from 'src/app/features/event/embedding/event-embedding.module';
import { FormEmbeddingModule } from 'src/app/features/form/embedding/form-embedding.module';
import { GuestArticleEmbeddingModule } from 'src/app/features/guest-article/embedding/guest-article-embedding.module';
import { MapEmbeddingModule } from 'src/app/features/map/embedding/map-embedding.module';
import { MediaEmbeddingModule } from 'src/app/features/media/embedding/media-embedding.module';
import { OrganisationEmbeddingModule } from 'src/app/features/organisation/embedding/organisation-embedding.module';
import { ReportEmbeddingModule } from 'src/app/features/report/embedding/report-embedding.module';
import { SurveyEmbeddingModule } from 'src/app/features/survey/embedding/survey-embedding.module';
import { Maybe, PageFeatureEntity } from 'src/schema/schema';

@Component({
  selector: 'app-portal-page-embeddings',
  templateUrl: './portal-page-embeddings.component.html',
  styleUrls: ['./portal-page-embeddings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,

    ArticleEmbeddingModule,
    AuthorEmbeddingModule,
    CalendarEmbeddingModule,
    ContestEmbeddingModule,
    DealEmbeddingModule,
    EventEmbeddingModule,
    FormEmbeddingModule,
    GuestArticleEmbeddingModule,
    MapEmbeddingModule,
    MediaEmbeddingModule,
    OrganisationEmbeddingModule,
    ReportEmbeddingModule,
    SurveyEmbeddingModule,
  ],
})
export class PortalPageEmbeddingsComponent implements OnInit {

  @Input()
  public embeddings?: Maybe<Maybe<PageFeatureEntity>[]>;

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
    this.embeddings = [...(this.embeddings || [])].sort((f1, f2) => (f1?.order || 0) - (f2?.order || 0));
  }

}
