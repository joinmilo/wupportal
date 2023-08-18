import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardType } from 'src/app/shared/widgets/card/typings/card';
import { selectOverviewDataSuburbs } from '../../state/portal-organisation-overview.selectors';

@Component({
  selector: 'app-portal-organisation-overview-suburb',
  templateUrl: './portal-organisation-overview-suburb.component.html',
  styleUrls: ['./portal-organisation-overview-suburb.component.scss']
})
export class PortalOrganisationOverviewSuburbComponent {

  public cardType = CardType.Contact;

  public suburbs = this.store.select(selectOverviewDataSuburbs);
  
  constructor(
    private store: Store,
  ) { }

}