import { Component, Input } from '@angular/core';
import { Maybe } from 'graphql/jsutils/Maybe';
import { AddressEntity } from 'src/app/core/api/generated/schema';
import { locationNavigationURL } from 'src/app/core/constants/url.constants';
import { PointOfInterest } from '../../typings/map';

@Component({
  styleUrls: ['map-popup.component.scss'],
  templateUrl: 'map-popup.component.html'
})
export class MapPopupComponent {

  @Input()
  public poi?: PointOfInterest;

  public openGoogleMaps(address: Maybe<AddressEntity>) {
    if (address?.latitude && address?.longitude) {
      window.open(locationNavigationURL(address.latitude, address.longitude));
    }
  }
}