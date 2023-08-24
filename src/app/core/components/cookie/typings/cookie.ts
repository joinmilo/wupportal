import { Maybe } from 'src/app/core/api/generated/schema';

export type Cookie = {
  externalContent?: Maybe<boolean>,
  statistics?: Maybe<boolean>,
  preferences?: Maybe<boolean>
};
