import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
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
    MatButtonModule,
    MatExpansionModule,
    RouterModule,
  ]
})
export class AdminMenuComponent {

  public collapsed = false;

  public homeRoute = ['/', adminUrl];

  public menuItems = this.store.select(selectAdminMenu);

  constructor(
    private store: Store,
  ) { }
}
