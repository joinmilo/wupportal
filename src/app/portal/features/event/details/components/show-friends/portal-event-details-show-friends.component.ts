import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Maybe, UserContextEntity } from 'src/schema/schema';

@Component({
  selector: 'app-portal-event-details-show-friends',
  templateUrl: 'portal-event-details-show-friends.component.html',
  styleUrls: ['./portal-event-details-show-friends.component.scss'],
})
export class PortalEventDetailsShowFriendsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public friends?: Maybe<UserContextEntity>[]) { }

}
