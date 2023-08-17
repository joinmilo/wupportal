import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { adminUrl } from 'src/app/core/constants/core.constants';
import { CoreModule } from 'src/app/core/core.module';
import { selectAdminMenu } from '../../state/admin.selectors';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    FontAwesomeModule,

    MatExpansionModule,
  ]
})
export class AdminMenuComponent {

  public homeRoute = ['/', adminUrl];

  public menuItems = this.store.select(selectAdminMenu);

  constructor(
    private store: Store,
  ) { }
}
