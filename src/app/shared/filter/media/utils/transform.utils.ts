
import { Maybe } from 'ngx-cinlib/core';
import { Filter } from 'ngx-cinlib/filters';
import { FilterSortPaginateInput, QueryOperator } from 'src/app/core/api/generated/schema';
import { MediaFilterQueryDefinition } from 'src/app/core/typings/filter-params/media-filter-param';
import { createListParam } from 'src/app/core/utils/params.utils';
import { MimeTypeFilterOptions } from '../typing/media-filter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformFn = (queryParams?: Maybe<{ [key: string]: any }>): Filter => {
  const params = {
    expression: {
      conjunction: {
        operands: [],
      }
    }
  } as FilterSortPaginateInput;

  if (queryParams && queryParams[MediaFilterQueryDefinition.mediaCategories]) {
    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams[MediaFilterQueryDefinition.mediaCategories],
        'category.id'
      )
    );
  }

  if (queryParams && queryParams[MediaFilterQueryDefinition.mediaTypes]?.length) {

    const mimeTypes = queryParams[MediaFilterQueryDefinition.mediaTypes];

    const fileIdx = mimeTypes.indexOf(MimeTypeFilterOptions.File);
    if (fileIdx > -1) {
      mimeTypes.splice(fileIdx, 1, 'word', 'pdf');
    }

    params.expression?.conjunction?.operands?.push(
      createListParam(
        mimeTypes,
        'media.mimeType',
        QueryOperator.Like
      )
    );
  }

  return params;
}
