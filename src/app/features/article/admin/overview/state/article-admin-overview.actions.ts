import { createActionGroup } from '@ngrx/store';
import { FilterSortPaginateInput, PageableList_ArticleEntity } from 'src/app/core/api/generated/schema';

export const ArticleAdminOverviewActions = createActionGroup({
  source: 'Article Admin Overview',
  events: {

    'set overview data': (articles: PageableList_ArticleEntity) => ({ articles }),

    'update params': (params: FilterSortPaginateInput) => ({ params }),
  }
});
