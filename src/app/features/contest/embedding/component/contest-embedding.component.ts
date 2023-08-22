import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardType } from 'src/app/shared/widgets/card/typings/card';
import { ContestEmbeddingActions } from '../state/contest-embedding.actions';
import { selectRecentContests } from '../state/contest-embedding.selectors';

@Component({
  selector: 'app-contest-embedding',
  templateUrl: './contest-embedding.component.html',
  styleUrls: ['./contest-embedding.component.scss']
})
export class ContestEmbeddingComponent {
  
  public cardType = CardType.Content;

  public contests = this.store.select(selectRecentContests);

  constructor(
    private store: Store, 
  ) { 
    this.store.dispatch(ContestEmbeddingActions.getRecentContests());
  }

}
