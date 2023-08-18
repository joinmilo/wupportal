import { createActionGroup, emptyProps } from '@ngrx/store';
import { ArticleEntity, FilterSortPaginateInput, Maybe, PageableList_ArticleEntity } from 'src/schema/schema';

export const PortalArticleOverviewActions = createActionGroup({
  source: 'Portal Article Overview',
  events: {
    'get sponsored article': emptyProps(),
    'set sponsored article': (article: Maybe<ArticleEntity>) => ({ article }),

    'set overview data': (articles: PageableList_ArticleEntity) => ({ articles }),

    'update params': (params: FilterSortPaginateInput) => ({ params }),
  }
});
