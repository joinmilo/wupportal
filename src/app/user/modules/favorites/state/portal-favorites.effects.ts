import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { FilterSortPaginateInput, PageableList_ArticleEntity, PageableList_DealEntity, PageableList_EventEntity, PageableList_OrganisationEntity, PageableList_UserContextEntity, QueryOperator } from 'src/app/core/api/generated/schema';
import { selectCurrentUser } from 'src/app/core/state/selectors/user.selectors';
import { GetArticleCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-article-cards.query.generated';
import { GetAuthorCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-author-cards.query.generated';
import { GetDealCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-deal-cards.query.generated';
import { GetEventCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-event-cards.query.generated';
import { GetOrganisationCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-organisation-cards.query.generated';
import { PortalFavoritesActions } from './portal-favorites.actions';

@Injectable()
export class PortalFavoritesEffects {

  getFavoriteArticles = createEffect(() => this.actions.pipe(
    ofType(PortalFavoritesActions.getFavoriteArticles),
    withLatestFrom(this.store.select(selectCurrentUser)),
    map(([action, user])=> ({
      sort: 'modified',
      dir: 'desc',
      size: action.params?.size,
      page: action.params?.page,

      expression: {
        entity: {
          path: 'favoritingUsers.id',
          operator: QueryOperator.Equal,
          value: user?.id
        }
      }
      } as FilterSortPaginateInput)),
    switchMap(params => this.getArticleCardsService.watch({params}).valueChanges),
    map(response => PortalFavoritesActions.setFavoriteArticles(response.data.getArticles as PageableList_ArticleEntity))
  ));

  getFavoriteAuthors = createEffect(() => this.actions.pipe(
    ofType(PortalFavoritesActions.getFavoriteAuthors),
    withLatestFrom(this.store.select(selectCurrentUser)),
    map(([action, user])=> ({
      sort: 'modified',
      dir: 'desc',
      size: action.params?.size,
      page: action.params?.page,

      expression: {
        entity: {
          path: 'favoritingUsers.id',
          operator: QueryOperator.Equal,
          value: user?.id
        }
      }
      } as FilterSortPaginateInput)),
    switchMap(params => this.getAuthorCardsService.watch({params}).valueChanges),
    map(response => PortalFavoritesActions.setFavoriteAuthors(response.data.getUserContexts as PageableList_UserContextEntity))
  ));

  getFavoriteDeals = createEffect(() => this.actions.pipe(
    ofType(PortalFavoritesActions.getFavoriteDeals),
    withLatestFrom(this.store.select(selectCurrentUser)),
    map(([action, user])=> ({
      sort: 'modified',
      dir: 'desc',
      size: action.params?.size,
      page: action.params?.page,

      expression: {
        entity: {
          path: 'favoritingUsers.id',
          operator: QueryOperator.Equal,
          value: user?.id
        }
      }
      } as FilterSortPaginateInput)),
    switchMap(params => this.getDealCardsService.watch({params}).valueChanges),
    map(response => PortalFavoritesActions.setFavoriteDeals(response.data.getDeals as PageableList_DealEntity))
  )); 

  getFavoriteEvents = createEffect(() => this.actions.pipe(
    ofType(PortalFavoritesActions.getFavoriteEvents),
    withLatestFrom(this.store.select(selectCurrentUser)),
    map(([action, user])=> ({
      sort: 'modified',
      dir: 'desc',
      size: action.params?.size,
      page: action.params?.page,

      expression: {
        entity: {
          path: 'favoritingUsers.id',
          operator: QueryOperator.Equal,
          value: user?.id
        }
      }
      } as FilterSortPaginateInput)),
    switchMap(params => this.getEventCardsService.watch({params}).valueChanges),
    map(response => PortalFavoritesActions.setFavoriteEvents(response.data.getEvents as PageableList_EventEntity))
  ));

  getFavoriteOrganisations = createEffect(() => this.actions.pipe(
    ofType(PortalFavoritesActions.getFavoriteOrganisations),
    withLatestFrom(this.store.select(selectCurrentUser)),
    map(([action, user])=> ({
      sort: 'modified',
      dir: 'desc',
      size: action.params?.size,
      page: action.params?.page,

      expression: {
        entity: {
          path: 'favoritingUsers.id',
          operator: QueryOperator.Equal,
          value: user?.id
        }
      }
      } as FilterSortPaginateInput)),
    switchMap(params => this.getOrganisationCardsService.watch({params}).valueChanges),
    map(response => PortalFavoritesActions.setFavoriteOrganisations(response.data.getOrganisations as PageableList_OrganisationEntity))
  ));
  
  constructor(
    private actions: Actions,
    private getArticleCardsService: GetArticleCardsGQL,
    private getAuthorCardsService: GetAuthorCardsGQL,
    private getDealCardsService: GetDealCardsGQL,
    private getEventCardsService: GetEventCardsGQL,
    private getOrganisationCardsService: GetOrganisationCardsGQL,
    private store: Store,
  ) {}
}
