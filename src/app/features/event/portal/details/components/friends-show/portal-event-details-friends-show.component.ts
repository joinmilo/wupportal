import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Maybe, UserContextEntity } from 'src/app/core/api/generated/schema';

@Component({
  selector: 'app-portal-event-details-friends-show',
  templateUrl: 'portal-event-details-friends-show.component.html',
  styleUrls: ['./portal-event-details-friends-show.component.scss'],
})
export class PortalEventDetailsFriendsShowComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public friends?: Maybe<UserContextEntity>[]) { }

}
