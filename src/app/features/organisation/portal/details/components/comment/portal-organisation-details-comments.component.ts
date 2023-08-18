import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { CoreUserActions } from 'src/app/core/state/actions/core-user.actions';
import { selectIsAuthenticated } from 'src/app/core/state/selectors/user.selectors';
import { PortalOrganisationDetailsActions } from '../../state/portal-organisation-details.actions';
import { selectOrganisationDetails } from '../../state/portal-organisation-details.selectors';


@Component({
  selector: 'app-portal-organisation-details-comment',
  templateUrl: './portal-organisation-details-comment.component.html',
  styleUrls: ['./portal-organisation-details-comment.component.scss']
})
export class PortalOrganisationDetailsCommentComponent {

  public lastComment = this.store.select(selectOrganisationDetails)
    .pipe(map(organisation => organisation?.lastOrganisationComment));

  constructor(
    private store: Store) { }

  public saveComment(content: string): void {
    this.store.select(selectIsAuthenticated)
      .pipe(take(1))
      .subscribe(isAuthenticated => isAuthenticated
        ? this.store.dispatch(PortalOrganisationDetailsActions.saveOrganisationComment({
            content,
          }))
        : this.store.dispatch(CoreUserActions.requireLogin()))
  }
}