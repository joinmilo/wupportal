import { createFeatureSelector } from '@ngrx/store';
import { footerFeatureKey } from '../constants/footer.constants';
import { FooterState } from '../state/footer.reducer';

export const selectFooterState = createFeatureSelector<FooterState>(footerFeatureKey);
