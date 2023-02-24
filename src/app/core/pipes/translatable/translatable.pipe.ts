import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, isObservable, map, Observable, of } from 'rxjs';
import { Maybe } from 'src/schema/schema';
import { selectLanguage } from '../../state/core.selectors';
import { TranslatableParent } from './translatable';

@Pipe({
  name: 'translatable'
})
export class TranslatablePipe implements PipeTransform {

  constructor(
    private store: Store
  ) {}

  public transform(
      v?: Maybe<TranslatableParent> | Observable<Maybe<TranslatableParent> | undefined>,
      field?: string): Observable<Maybe<string> | undefined> {
    return combineLatest([
      isObservable(v) ? v : of(v),
      this.store.select(selectLanguage)
    ]).pipe(
      map(([value, language]) => value?.translatables?.find(t => t?.language?.locale === language?.locale)),
      map(translatable => (translatable && field ? translatable[field] : '') as string),
    );
  }
}
