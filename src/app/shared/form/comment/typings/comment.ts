import { Maybe, UserContextEntity } from 'src/schema/schema';

export interface Comment {
  id?: Maybe<string>,
  created?: Maybe<string>,
  content?: Maybe<string>,
  userContext?: Maybe<UserContextEntity>
}