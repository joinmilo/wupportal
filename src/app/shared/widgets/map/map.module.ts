
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core/core.module';
import { AddressPieceComponent } from '../../pieces/address/address-piece.component';
import { DatePieceComponent } from '../../pieces/date/date-piece.component';
import { MapAttributionComponent } from './components/attribution/map-attribution.component';
import { MapComponent } from './components/map.component';
import { MapMarkerComponent } from './components/marker/map-marker.component';
import { MapPopupComponent } from './components/popup/map-popup.component';

const components = [
  MapAttributionComponent,
  MapMarkerComponent,
  MapPopupComponent,
  MapComponent,
];

const framework = [
  CommonModule,
];

const libs = [
  FontAwesomeModule,
  LeafletModule,
  LeafletMarkerClusterModule
];

const modules = [
  CoreModule,
  AddressPieceComponent,
  DatePieceComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...libs,
    ...modules,
  ],
  exports: [...components],
})
export class MapModule { }