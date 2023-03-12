import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardInput } from 'src/app/core/typings/card';
import { pageFeatureKey } from '../constants/page.constants';
import { PageState } from './page.reducer';

export const selectPageState = createFeatureSelector<PageState>(pageFeatureKey);

export const selectCurrentPage = createSelector(
  selectPageState,
  state => state.page
);

export const selectRecentArticles = createSelector(
  selectPageState,
  state => state.recentArticles?.map(article => ({
    categoryTranslatables: article.category?.translatables,
    categoryTranslatableField: 'name',
    creator: article.publicAuthor ?? article.author?.user?.firstName,
    creatorImage: article.author?.titleImage,
    date: article.modified,
    image: article.cardImage,
    textTranslatableField: 'shortDescription', //TODO: take short description
    titleTranslatableField: 'title',
    translatables: article.translatables,
  })) as CardInput[]
);

export const selectRecentEvents = createSelector(
  selectPageState,
  state => state.recentEvents?.map(event => ({
    address: event.address,
    categoryTranslatables: event.category?.translatables,
    categoryTranslatableField: 'name',
    creator: event.contact?.name,
    creatorImage: event.creator?.titleImage,
    date: event.schedules
      ?.filter(a => new Date(a?.startDate).toLocaleDateString() > Date.now().toLocaleString()
       || new Date(a?.endDate).toLocaleDateString() > Date.now().toLocaleString())
      ?.sort((a, b) => b?.startDate.localeCompare(a?.startDate))
      ?.shift()?.startDate,
    dateTime: true,
    image: event.cardImage,
    textTranslatableField: 'shortDescription',
    titleTranslatableField: 'name',
    translatables: event.translatables,
  })) as CardInput[]
);
