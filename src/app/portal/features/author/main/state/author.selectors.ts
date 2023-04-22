import { createFeatureSelector } from '@ngrx/store';
import { authorStateKey } from '../constants/author.constant';
import { AuthorState } from './author.reducer';

export const selectAuthorState = createFeatureSelector<AuthorState>(authorStateKey);