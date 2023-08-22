import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardType } from 'src/app/shared/widgets/card/typings/card';
import { OrganisationEmbeddingActions } from '../state/organisation-embedding.actions';
import { selectRecentOrganisations } from '../state/organisation-embedding.selectors';

@Component({
  selector: 'app-organisation-embedding',
  templateUrl: './organisation-embedding.component.html',
  styleUrls: ['./organisation-embedding.component.scss']
})
export class OrganisationEmbeddingComponent {
  
  public cardType = CardType.Contact;

  public organisations = this.store.select(selectRecentOrganisations);

  constructor(
    private store: Store, 
  ) {
    this.store.dispatch(OrganisationEmbeddingActions.getRecentOrganisations());
  }

}
