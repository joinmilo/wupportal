import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOverviewDataCategories } from '../../state/portal-article-overview.selectors';

@Component({
  selector: 'app-portal-article-overview-category',
  templateUrl: './portal-article-overview-category.component.html',
  styleUrls: ['./portal-article-overview-category.component.scss']
})
export class PortalArticleOverviewCategoryComponent {

  public categories = this.store.select(selectOverviewDataCategories);
  
  constructor(
    private store: Store,
  ) { }

}