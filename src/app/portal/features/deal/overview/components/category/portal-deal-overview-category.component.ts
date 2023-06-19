import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOverviewDataCategories } from '../../state/portal-deal-overview.selectors';

@Component({
  selector: 'app-portal-deal-overview-category',
  templateUrl: './portal-deal-overview-category.component.html',
  styleUrls: ['./portal-deal-overview-category.component.scss']
})
export class PortalDealOverviewCategoryComponent {

  public categories = this.store.select(selectOverviewDataCategories);
  
  constructor(
    private store: Store,
  ) { }

}