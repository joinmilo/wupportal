import { createFeatureSelector, createSelector } from '@ngrx/store';
import { articlesToCards, authorsToCards, contestsToCards, dealsToCards, eventsToCards, organisationsToCards, surveysToCards } from '../../../core/utils/card.utils';
import { searchStateKey } from '../constants/search.constants';
import { SearchState } from './search.reducer';

export const selectSearchState = createFeatureSelector<SearchState>(searchStateKey);

export const selectSearchResult = createSelector(
  selectSearchState,
  state => state.searchResult
);

export const selectSearchQuery = createSelector(
  selectSearchState,
  state => state.searchQuery
);

export const selectResultsPageActive = createSelector(
  selectSearchState,
  state => state.resultPageActive
);

export const selectFoundEvents = createSelector(
  selectSearchState,
  state => eventsToCards(state.events)
);

export const selectFoundArticles = createSelector(
  selectSearchState,
  state => articlesToCards(state.articles)
);

export const selectFoundOrganisations = createSelector(
  selectSearchState,
  state => organisationsToCards(state.organisations)
);

export const selectFoundAuthors = createSelector(
  selectSearchState,
  state => authorsToCards(state.authors)
);

export const selectFoundDeals = createSelector(
  selectSearchState,
  state => dealsToCards(state.deals)
);

export const selectFoundSurveys = createSelector(
  selectSearchState,
  state => surveysToCards(state.surveys)
);

export const selectFoundContests = createSelector(
  selectSearchState,
  state => contestsToCards(state.contests)
);

export const selectIsSearching = createSelector(
  selectSearchState,
  state => state.isSearching
);