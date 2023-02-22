import { createFeatureSelector, createSelector } from '@ngrx/store';
import { footerFeatureKey } from '../constants/footer.constants';
import { FooterState } from '../state/footer.reducer';

export const selectFooterState = createFeatureSelector<FooterState>(footerFeatureKey);

export const selectCurrentFooter = createSelector(
  selectFooterState,
  state => state.footer
);
