import { ConjunctionOperator, Maybe, QueryExpressionInput, QueryOperator } from 'src/schema/schema';

export const createListParam = (
  param: Maybe<string[] | string>,
  field: string): QueryExpressionInput => {
  return (typeof param === 'string' || param?.length === 1)
    ? {
      entity: {
        path: field,
        operator: QueryOperator.Equal,
        value: typeof param === 'string' ? param : param[0]
      }
    }
    : {
      conjunction: {
        operands: param?.map(id => ({
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