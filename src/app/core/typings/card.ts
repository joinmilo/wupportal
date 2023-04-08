import { Maybe } from 'graphql/jsutils/Maybe';
import { AddressEntity, MediaEntity } from 'src/schema/schema';
import { Translatable } from './translatable';

export enum CardType {
  Contact = 'contact',
  Content = 'content',
  Sponsored = 'sponsored',
}

export type CardInput = {
  address?: Maybe<AddressEntity>,

  // Either 
  category?: Maybe<string>,
  categoryTranslatables?: Maybe<Maybe<Translatable>[]>,
  categoryTranslatableField?: Maybe<string>,

  creator?: Maybe<string>,
  creatorImage?: Maybe<MediaEntity>,
  email?: Maybe<string>,
  date?: Maybe<string>,
  dateTime: boolean,
  image?: Maybe<MediaEntity>,

  text?: Maybe<string>,
  textTranslatableField?: Maybe<string>,

  title?: Maybe<string>,
  titleTranslatableField?: Maybe<string>,

  translatables?: Maybe<Maybe<Translatable>[]>,
}