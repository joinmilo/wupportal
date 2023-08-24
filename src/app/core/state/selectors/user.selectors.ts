import { createSelector } from '@ngrx/store';
import { FriendEntity, Maybe } from 'src/app/core/api/generated/schema';
import { ContentEntity } from '../../typings/content-entity';
import { selectCoreUserState } from './selector';

export const selectCookieSettings = createSelector(
  selectCoreUserState,
  state => state.cookieSettings
);

export const selectCurrentUser = createSelector(
  selectCoreUserState,
  state => state?.currentUser
);

export const selectIsAuthenticated = createSelector(
  selectCoreUserState,
  state => !!state?.currentUser?.id
);

export const selectAllFriends = createSelector(
  selectCurrentUser,
  user => [...(user?.receivedFriendRequests ?? []), ...(user?.sentFriendRequests ?? [])]
);

export const selectAllFriendUsers = createSelector(
  selectAllFriends,
  selectCurrentUser,
  (friends, user) => friends?.map(friend =>
    friend?.addressee?.id !== user?.id
      ? friend?.addressee
      : friend?.requester?.id !== user?.id
        ? friend?.requester
        : undefined
  )
);

export const selectAcceptedFriends = createSelector(
  selectAllFriends,
  friends => friends?.filter(friend => friend?.accepted)
);

export const selectAcceptedFriendUsers = createSelector(
  selectAcceptedFriends,
  selectCurrentUser,
  (friends, user) => friends?.map(friend =>
    friend?.addressee?.id !== user?.id
      ? friend?.addressee
      : friend?.requester?.id !== user?.id
        ? friend?.requester
        : undefined
    )
);

export const selectReceivedFriendRequest = createSelector(
  selectCurrentUser,
  user => user?.receivedFriendRequests
    ?.filter(friend => !friend?.accepted) as Maybe<FriendEntity>[]
);

export const selectSentFriendRequests = createSelector(
  selectCurrentUser,
  user => user?.sentFriendRequests
    ?.filter(friend => !friend?.accepted) as Maybe<FriendEntity>[]
);

export const selectUserArticleRatings = createSelector(
  selectCurrentUser,
  user => user?.articleRatings
);

export const selectUserEventRatings = createSelector(
  selectCurrentUser,
  user => user?.eventRatings
);

export const selectUserOrganisationRatings = createSelector(
  selectCurrentUser,
  user => user?.organisationRatings
);

export const selectArticleFavorites = createSelector(
  selectCurrentUser,
  user => user?.favoriteArticles
);

export const selectFavoriteDeals = createSelector(
  selectCurrentUser,
  user => user?.favoriteDeals
);

export const selectFavoriteEvents = createSelector(
  selectCurrentUser,
  user => user?.favoriteEvents
);

export const selectFavoriteOrganisations = createSelector(
  selectCurrentUser,
  user => user?.favoriteOrganisations
);

export const selectFavoriteAuthors = createSelector(
  selectCurrentUser,
  user => user?.favoriteAuthors
);

export const selectIsFavorite = (entity: ContentEntity, id: string) => {
  switch (entity) {
    case 'ArticleEntity':
      return createSelector(
        selectArticleFavorites, 
        favorites => !!favorites?.find(f => f?.id === id)
      );
    case 'DealEntity':
      return createSelector(
        selectFavoriteDeals,
        favorites => !!favorites?.find(f => f?.id === id)
      );
    case 'EventEntity':
      return createSelector(
        selectFavoriteEvents,
        favorites => !!favorites?.find(f => f?.id === id)
      );
    case 'OrganisationEntity':
      return createSelector(
        selectFavoriteOrganisations,
        favorites => !!favorites?.find(f => f?.id === id)
      );
    case 'UserContextEntity':
      return createSelector(
        selectFavoriteAuthors,
        favorites => !!favorites?.find(f => f?.id === id)
      );
    default:
      return createSelector(selectCurrentUser, () => false);

  }
}