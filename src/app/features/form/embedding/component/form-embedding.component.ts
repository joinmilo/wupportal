import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardType } from 'src/app/shared/widgets/card/typings/card';
import { FormEmbeddingActions } from '../state/form-embedding.actions';
import { selectRecentForms } from '../state/form-embedding.selectors';

@Component({
  selector: 'app-form-embedding',
  templateUrl: './form-embedding.component.html',
  styleUrls: ['./form-embedding.component.scss']
})
export class FormEmbeddingComponent {

  public cardType = CardType.Content;
  
  public forms = this.store.select(selectRecentForms);

  constructor(
    private store: Store, 
  ) {
    this.store.dispatch(FormEmbeddingActions.getRecentForms())
  }

}
