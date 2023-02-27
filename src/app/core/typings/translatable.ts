import { LanguageEntity, Maybe } from "src/schema/schema";

export type Translatable = {
  language?: Maybe<LanguageEntity>;
  [key: string]: string | LanguageEntity | undefined | null;
}

export type TranslatableParent = {
  translatables?: Maybe<Maybe<Translatable>[]> | undefined
}