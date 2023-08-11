import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-layout-desktop',
  templateUrl: './admin-layout-desktop.component.html',
  styleUrls: ['./admin-layout-desktop.component.scss']
})
export class AdminLayoutDesktopComponent {

  showFiller = false;

  constructor(
    private store: Store,
  ) { }
}
