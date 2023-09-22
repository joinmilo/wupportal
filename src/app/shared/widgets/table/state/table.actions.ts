/* eslint-disable @typescript-eslint/no-explicit-any */
import { Params } from '@angular/router';
import { createActionGroup, emptyProps } from '@ngrx/store';
import { Maybe } from 'src/app/core/api/generated/schema';
import { ContentEntity } from 'src/app/core/typings/content-entity';
import { Column, PageableList, RowAction, SortPaginate } from '../typings/table';

export const TableActions = createActionGroup({
  source: 'Table',
  events: {
    'init': emptyProps(),
    'query params initialized': (params: Params) => ({ params }),
    'browser navigated': (params: Params) => ({ params }),

    'set actions': (actions: RowAction<any>[]) => ({ actions }),
    'set clickable': (clickable: boolean) => ({ clickable }),
    'set columns': (columns: Column<any>[]) => ({ columns }),
    'set data': (data: Maybe<PageableList<any>>) => ({ data }),
    'set entity': (entity: ContentEntity) => ({ entity }),
    'set params': (params: SortPaginate) => ({ params }),
    'set query params': (queryParams: boolean) => ({ queryParams }),

    'params updated': (params: SortPaginate) => ({ params }),
    'row clicked': (row: any) => ({ row }),

    'row editing enabled': (row: any) => ({ row }),
    'row editing cancelled': emptyProps(),
    'row edited': emptyProps(),

    'reset': emptyProps(),
  }
});
