import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeInAnimation } from 'src/app/core/animations/animations';
import { accountUrl, adminUrl } from 'src/app/core/constants/core.constants';
import { selectCurrentUser } from 'src/app/core/state/selectors/user.selectors';
import { selectIsSearching } from 'src/app/shared/pages/search/state/search.selectors';
import { Maybe, UserContextEntity } from 'src/schema/schema';

@Component({
  selector: 'app-portal-header-mobile',
  templateUrl: './portal-header-mobile.component.html',
  styleUrls: ['./portal-header-mobile.component.scss'],
  animations: [fadeInAnimation()],
})
export class PortalHeaderMobileComponent implements OnInit{

  public accountUrl = accountUrl;
  public adminUrl = adminUrl;
  
  public currentUser?: Maybe<UserContextEntity>;

  public isSearching = this.store.select(selectIsSearching);
  
  constructor(
    private store: Store) {}

  public ngOnInit(): void {
    this.store.select(selectCurrentUser).subscribe((user) => {
      this.currentUser = user;
    });
  }

}