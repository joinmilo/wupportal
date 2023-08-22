import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardType } from 'src/app/shared/widgets/card/typings/card';
import { SurveyEmbeddingActions } from '../state/survey-embedding.actions';
import { selectRecentSurveys } from '../state/survey-embedding.selectors';

@Component({
  selector: 'app-survey-embedding',
  templateUrl: './survey-embedding.component.html',
  styleUrls: ['./survey-embedding.component.scss']
})
export class SurveyEmbeddingComponent {
  
  public cardType = CardType.Content;

  public surveys = this.store.select(selectRecentSurveys);

  constructor(
    private store: Store, 
  ) {
    this.store.dispatch(SurveyEmbeddingActions.getRecentSurveys());
  }

}
