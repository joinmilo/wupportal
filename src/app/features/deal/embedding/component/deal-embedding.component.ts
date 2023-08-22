import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardType } from 'src/app/shared/widgets/card/typings/card';
import { DealEmbeddingActions } from '../state/deal-embedding.actions';
import { selectRecentDeals } from '../state/deal-embedding.selectors';

@Component({
  selector: 'app-deal-embedding',
  templateUrl: './deal-embedding.component.html',
  styleUrls: ['./deal-embedding.component.scss']
})
export class DealEmbeddingComponent {

  public cardType = CardType.Content;
  
  public deals = this.store.select(selectRecentDeals);

  constructor(
    private store: Store, 
  ) {
    this.store.dispatch(DealEmbeddingActions.getRecentDeals());
  }

}
