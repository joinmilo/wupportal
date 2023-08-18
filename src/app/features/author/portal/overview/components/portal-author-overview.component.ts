import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardType } from 'src/app/shared/widgets/card/typings/card';
import { SortOption, SortPaginate } from 'src/app/shared/widgets/table/typings/table';
import { PortalAuthorOverviewActions } from '../state/portal-author-overview.actions';
import { selectAuthors } from '../state/portal-author-overview.selectors';

@Component({
  selector: 'app-portal-author-overview',
  templateUrl: './portal-author-overview.component.html',
  styleUrls: ['./portal-author-overview.component.scss']
})
export class PortalAuthorOverviewComponent {

  public authors = this.store.select(selectAuthors);

  public cardType = CardType.Contact;

  public sortOptions: SortOption[] = [
    {
      label: 'name',
      field: 'user.firstName',
    },
    {
      label: 'name',
      field: 'user.firstName',
      dir: 'desc'
    },
  ];

  constructor(
    private store: Store,
  ) {}

  public updateParams(params: SortPaginate) {
    this.store.dispatch(PortalAuthorOverviewActions.updateParams(params));
  }

}