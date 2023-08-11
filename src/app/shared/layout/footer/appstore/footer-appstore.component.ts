import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectApps } from 'src/app/core/state/selectors/core.selectors';

@Component({
  selector: 'app-footer-appstore',
  templateUrl: './footer-appstore.component.html',
  styleUrls: ['./footer-appstore.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})

export class FooterAppStoreComponent {

  public apps = this.store.select(selectApps);

  constructor(
    private store: Store
  ) { }

}
