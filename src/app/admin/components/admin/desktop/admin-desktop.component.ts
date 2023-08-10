import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-desktop',
  templateUrl: './admin-desktop.component.html',
  styleUrls: ['./admin-desktop.component.scss']
})
export class AdminDesktopComponent {

  showFiller = false;

  constructor(
    private store: Store,
  ) { }
}
