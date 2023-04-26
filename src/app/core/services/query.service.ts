import { Injectable } from '@angular/core';
import { ConjunctionOperator, Maybe, QueryConjunctionInput, QueryEntityInput, QueryExpressionInput, QueryOperator } from 'src/schema/schema';

class QueryExpressionBuilder<T> {
  expressions: QueryExpressionInput[] = []

  public addNullable(
    path: string,
    value?: Maybe<string>,
    operator = QueryOperator.Equal) {
    return this.addEntity({path, value, operator});
  }

  public add<K extends keyof T>(
    path: Extract<K, string>,
    value: string,
    operator = QueryOperator.Equal) {
    if (!value) {
      throw new Error('Value must not be null!');
    }
    
    return this.addEntity({path, value, operator});
  }

  public addEntity(entity: QueryEntityInput) {
    return this.addExpression({entity});
  }

  public addConjunction(conjunction: QueryConjunctionInput): QueryExpressionBuilder<T> {
    return this.addExpression(({conjunction}))
  }

  public addExpression(expression: QueryExpressionInput): QueryExpressionBuilder<T> {
    this.expressions.push(expression)
    return this;
  }

  public wrap(operator: ConjunctionOperator): QueryExpressionBuilder<T> {
    this.expressions = [{
      conjunction: {
        operands: this.expressions,
        operator
      }
    }]
    return this;
  }

  public build(operator = ConjunctionOperator.And): QueryExpressionInput {
    if (this.expressions.length > 1) {
      this.wrap(operator)
    }
    return this.expressions[0]
  }
}

@Injectable({ providedIn: 'root' })
export class QueryExpressionService {

  public builder() {
    return new QueryExpressionBuilder();
  }
}
