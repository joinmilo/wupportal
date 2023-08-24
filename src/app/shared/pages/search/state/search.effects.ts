import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap } from 'rxjs';
import { ArticleEntity, ConjunctionOperator, ContestEntity, DealEntity, EventEntity, OrganisationEntity, QueryOperator, SearchDto, SurveyEntity, UserContextEntity } from 'src/app/core/api/generated/schema';
import { portalUrl } from 'src/app/core/constants/core.constants';
import { GetArticleCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-article-cards.query.generated';
import { GetAuthorCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-author-cards.query.generated';
import { GetContestCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-contest-cards.query.generated';
import { GetDealCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-deal-cards.query.generated';
import { GetEventCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-event-cards.query.generated';
import { GetOrganisationCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-organisation-cards.query.generated';
import { GetSurveyCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-survey-cards.query.generated';
import { SearchGQL } from '../api/generated/search.query.generated';
import { SearchActions } from './search.actions';
import { selectResultsPageActive, selectSearchQuery } from './search.selectors';

@Injectable()
export class SearchEffects {

  getSearchResult = createEffect(() => this.actions.pipe(
    ofType(SearchActions.searchQuerySet),
    switchMap((action) => this.getSearchService.watch({
      params: {
        search: action.query,
        sort: 'modified',
        dir: 'desc',
        size: 4,
      }
    }).valueChanges),
    map(response => SearchActions.setSearchResult(response.data.search as SearchDto[]))
  ));

  navigateResultPage = createEffect(() => this.actions.pipe(
    ofType(SearchActions.navigateResultPage),
    tap(() => this.router.navigate(['/', portalUrl, 'search', 'result'])),
  ), { dispatch: false });

  searchDetails = createEffect(() => this.actions.pipe(
    ofType(
      SearchActions.navigateResultPage,
      SearchActions.searchQuerySet
    ),
    concatLatestFrom(() => 
      this.store.select(selectResultsPageActive)
    ),
    filter(([, resultPageActive]) => resultPageActive),
    map(() => SearchActions.searchDetails()),
  ));

  getEvents = createEffect(() => this.actions.pipe(
    ofType(SearchActions.searchDetails),
    concatLatestFrom(() => 
      this.store.select(selectSearchQuery)
    ),
    switchMap(([, query]) => this.getEventCardsService.watch({
      params: {
        search: query,
        sort: 'modified',
        dir: 'desc',
        size: 5,
      }
    }).valueChanges),
    map(response => SearchActions.setFoundEvents(response.data.getEvents?.result as EventEntity[]))
  ));

  getArticles = createEffect(() => this.actions.pipe(
    ofType(SearchActions.searchDetails),
    concatLatestFrom(() => 
      this.store.select(selectSearchQuery)
    ),
    switchMap(([, query]) => this.getArticleCardsService.watch({
      params: {
        search: query,
        sort: 'modified',
        dir: 'desc',
        size: 5,
      }
    }).valueChanges),
    map(response => SearchActions.setFoundArticles(response.data.getArticles?.result as ArticleEntity[]))
  ));

  getOrganisations = createEffect(() => this.actions.pipe(
    ofType(SearchActions.searchDetails),
    concatLatestFrom(() => 
      this.store.select(selectSearchQuery)
    ),
    switchMap(([, query]) => this.getOrganisationCardsService.watch({
      params: {
        search: query,
        sort: 'modified',
        dir: 'desc',
        size: 5,
      }
    }).valueChanges),
    map(response => SearchActions.setFoundOrganisations(response.data.getOrganisations?.result as OrganisationEntity[]))
  ));

  getAuthors = createEffect(() => this.actions.pipe(
    ofType(SearchActions.searchDetails),
    concatLatestFrom(() => 
      this.store.select(selectSearchQuery)
    ),
    switchMap(([, query]) => this.getAuthorCardsService.watch({
      params: {
        expression: {
          conjunction: {
            operands: [
              {
                conjunction: {
                  operator: ConjunctionOperator.Or,
                  operands: [
                    {
                      entity: {
                        operator: QueryOperator.Like,
                        path: 'user.firstName',
                        value: query
                      }
                    },
                    {
                      entity: {
                        operator: QueryOperator.Like,
                        path: 'user.lastName',
                        value: query
                      }
                    },
                    {
                      entity: {
                        operator: QueryOperator.Like,
                        path: 'user.email',
                        value: query
                      }
                    }
                  ]
                }
              },
              { entity: { operator: QueryOperator.NotEqual, path: 'articles', value: null } }
            ]
          }
        },
        sort: 'modified',
        dir: 'desc',
        size: 5,
      }
    }).valueChanges),
    map(response => SearchActions.setFoundAuthors(response.data.getUserContexts?.result as UserContextEntity[]))
  ));

  getDeals = createEffect(() => this.actions.pipe(
    ofType(SearchActions.searchDetails),
    concatLatestFrom(() => 
      this.store.select(selectSearchQuery)
    ),
    switchMap(([, query]) => this.getDealCardsService.watch({
      params: {
        search: query,
        sort: 'modified',
        dir: 'desc',
        size: 5,
      }
    }).valueChanges),
    map(response => SearchActions.setFoundDeals(response.data.getDeals?.result as DealEntity[]))
  ));

  getSurveys = createEffect(() => this.actions.pipe(
    ofType(SearchActions.searchDetails),
    concatLatestFrom(() => 
      this.store.select(selectSearchQuery)
    ),
    switchMap(([, query]) => this.getSurveyCardsService.watch({
      params: {
        search: query,
        sort: 'modified',
        dir: 'desc',
        size: 5,
      }
    }).valueChanges),
    map(response => SearchActions.setFoundSurveys(response.data.getSurveys?.result as SurveyEntity[]))
  ));

  getContest = createEffect(() => this.actions.pipe(
    ofType(SearchActions.searchDetails),
    concatLatestFrom(() => 
      this.store.select(selectSearchQuery)
    ),
    switchMap(([, query]) => this.getContestCardsService.watch({
      params: {
        search: query,
        sort: 'modified',
        dir: 'desc',
        size: 5,
      }
    }).valueChanges),
    map(response => SearchActions.setFoundContests(response.data.getContests?.result as ContestEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getSearchService: SearchGQL,
    private getArticleCardsService: GetArticleCardsGQL,
    private getAuthorCardsService: GetAuthorCardsGQL,
    private getContestCardsService: GetContestCardsGQL,
    private getDealCardsService: GetDealCardsGQL,
    private getEventCardsService: GetEventCardsGQL,
    private getOrganisationCardsService: GetOrganisationCardsGQL,
    private getSurveyCardsService: GetSurveyCardsGQL,
    private router: Router,
    private store: Store,
  ) { }
}
