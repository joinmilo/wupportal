import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { EventQueryParams } from 'src/app/shared/event-filter/typings/query-param';
import { ConjunctionOperator, FilterSortPaginateInput, Maybe, QueryExpressionInput, QueryOperator } from 'src/schema/schema';
import { PortalEventOverviewActions } from '../state/portal-event-overview.actions';

@Injectable()
export class QueryRouterService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
  ) { }

  public watch(): Observable<unknown> {
    return this.activatedRoute.queryParams
      .pipe(
        tap((queryParams: EventQueryParams) => {
        const params = this.initParams(queryParams);

        if(queryParams.categories) {
          params.expression?.conjunction?.operands?.push(
            this.createListParam(
              queryParams.categories,
              'category.id'
            )
          );
        }

        if(queryParams.suburbs) {
          params.expression?.conjunction?.operands?.push(
            this.createListParam(
              queryParams.suburbs,
              'address.suburb.id'
            )
          );
        }

        if(queryParams.targetgroups) {
          params.expression?.conjunction?.operands?.push(
            this.createListParam(
              queryParams.targetgroups,
              'targetGroups.id'
            )
          );
        }

        if(queryParams['current-only']) {
          params.expression?.conjunction?.operands?.push({
            entity: {
              path: 'schedules.startDate',
              operator: QueryOperator.GreaterOrEqual,
              value: new Date().toISOString()
            }
          });
        }

        if(queryParams['free-only']) {
          params.expression?.conjunction?.operands?.push({
            entity: {
              path: 'entryFee',
              operator: QueryOperator.Equal,
              value: null
            }
          });
        }

        this.store.dispatch(PortalEventOverviewActions.setParams(params));
        })
      );
  }
  
  private initParams(queryParams: EventQueryParams): FilterSortPaginateInput {
    return queryParams.categories?.length
      || queryParams.targetgroups?.length
      || queryParams['current-only']?.length
      || queryParams['free-only']?.length
      || queryParams.suburbs?.length
      ? {
          expression: {
            conjunction: {
              operands: [],
            }
          }
        } as FilterSortPaginateInput
      : {};
  }

  private createListParam(
    param: string[] | string,
    field: string): Maybe<QueryExpressionInput> {
    return typeof param === 'string'
      ? {
          entity: {
            path: field,
            operator: QueryOperator.Equal,
            value: param
          } 
        }
      : {
          conjunction: {
            operands: param.map(id => ({
              entity: {
                path: field,
                operator: QueryOperator.Equal,
                value: id
              }
            })),
            operator: ConjunctionOperator.Or
          }
        };
  }
  
}