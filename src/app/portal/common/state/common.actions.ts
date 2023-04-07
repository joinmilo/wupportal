import { createActionGroup, emptyProps } from '@ngrx/store';
import { AppEntity, ArticleEntity, EventEntity, FeatureEntity, Maybe, MenuItemEntity, OrganisationEntity, SocialMediaEntity, UserContextEntity } from 'src/schema/schema';
import { ContestEntity, DealEntity, SearchDto, SurveyEntity } from './../../../../schema/schema';

export const CommonActions = createActionGroup({
  source: 'Portal Common',
  events: {
    'init': emptyProps(),

    'set apps': (apps: AppEntity[]) => ({ apps }),
    'set social media': (socialMedia: SocialMediaEntity[]) => ({ socialMedia }),

    'get menu': (parentId: string) => ({ parentId }),
    'set menu': (menuItems: MenuItemEntity[]) => ({ menuItems }),


    'navigate menu': (item: Maybe<MenuItemEntity>) => ({ item }),
    'navigate details': (entityId?: Maybe<string>, feature?: Maybe<FeatureEntity>) => ({ entityId, feature }),
    'not found': emptyProps(),

    'search query set': (query?: Maybe<string>) => ({ query }),
    'set search result': (searchResult: SearchDto[]) => ({ searchResult }),
    'set found Events': (events?: EventEntity[]) => ({ events }),
    'set found Organisations': (organisations?: OrganisationEntity[]) => ({ organisations }),
    'set found Articles': (articles: ArticleEntity[]) => ({ articles }),
    'set found Contests': (contests: ContestEntity[]) => ({ contests }),
    'set found Deals': (deals: DealEntity[]) => ({ deals }),
    'set found Surveys': (surveys: SurveyEntity[]) => ({ surveys }),
    'set found Authors': (authors: UserContextEntity[]) => ({ authors }),
    'set search state': (isSearching: boolean) => ({ isSearching }),
  },
});
