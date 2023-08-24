import { Maybe, UserContextEntity } from 'src/app/core/api/generated/schema';

export interface Comment {
  id?: Maybe<string>,
  created?: Maybe<string>,
  content?: Maybe<string>,
  userContext?: Maybe<UserContextEntity>
}