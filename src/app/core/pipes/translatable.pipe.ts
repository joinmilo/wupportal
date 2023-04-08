/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, isObservable, map, of } from 'rxjs';
import { ConfigurationEntity, LanguageEntity, Maybe } from 'src/schema/schema';
import { defaultLocaleConfig } from '../constants/core.constants';
import { selectConfiguration, selectLanguage } from '../state/core.selectors';
import { Translatable } from '../typings/translatable';

@Pipe({
  name: 'translatable'
})
export class TranslatablePipe implements PipeTransform {

  constructor(
    private store: Store
  ) { }

  public transform(
    v?: any,
    field?: Maybe<string>): Observable<Maybe<string> | undefined> {
    return combineLatest([
      isObservable(v) ? v : of(v),
      this.store.select(selectLanguage),
      this.store.select(selectConfiguration(defaultLocaleConfig))
    ]).pipe(
      map(([value, language, defaultLocale]) => (Array.isArray(value) ? [value, language, defaultLocale] : [(value as any)?.translatables, language, defaultLocale]) as [Maybe<Translatable[]>, LanguageEntity, ConfigurationEntity]),
      map(([translatables, language, defaultLocale]) => {
        const translatable = translatables?.find(t => t?.language?.locale === language?.locale);
        return translatable ?? translatables?.find(t => t?.language?.locale === defaultLocale.value);
      }),
      map(translatable => (translatable && field ? translatable[field] : '') as string),
    );
  }
}
