import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, isObservable, map, Observable, of } from 'rxjs';
import { LanguageEntity, Maybe } from 'src/schema/schema';
import { selectLanguage } from '../state/core.selectors';
import { Translatable, TranslatableParent } from '../typings/translatable';

@Pipe({
  name: 'translatable'
})
export class TranslatablePipe implements PipeTransform {

  constructor(
    private store: Store
  ) { }

  public transform(
    v?: Maybe<TranslatableParent> | Maybe<Translatable[]> | Observable<Maybe<TranslatableParent> | undefined>,
    field?: Maybe<string>): Observable<Maybe<string> | undefined> {
    return combineLatest([
      isObservable(v) ? v : of(v),
      this.store.select(selectLanguage)
    ]).pipe(
      map(([value, language]) => (Array.isArray(value) ? [value, language] : [value?.translatables, language]) as [Maybe<Translatable[]>, LanguageEntity]),
      map(([translatables, language]) => translatables?.find(t => t?.language?.locale === language?.locale)),
      map(translatable => (translatable && field ? translatable[field] : '') as string),
    );
  }
}
