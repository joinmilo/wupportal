import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOverviewDataCategories } from '../../state/portal-event-overview.selectors';

@Component({
  selector: 'app-portal-event-overview-category',
  templateUrl: './portal-event-overview-category.component.html',
  styleUrls: ['./portal-event-overview-category.component.scss']
})
export class PortalEventOverviewCategoryComponent {

  public categories = this.store.select(selectOverviewDataCategories);
  
  constructor(
    private store: Store,
  ) { }

}