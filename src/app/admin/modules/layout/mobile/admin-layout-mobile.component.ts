import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminActions } from 'src/app/admin/state/admin.actions';
import { selectIsAdminMenuOpen } from 'src/app/admin/state/admin.selectors';
import { CoreModule } from 'src/app/core/core.module';
import { AdminHeaderModule } from '../../header/admin-header.module';
import { AdminMenuComponent } from '../../menu/admin-menu.component';

@Component({
  selector: 'app-admin-layout-mobile',
  templateUrl: './admin-layout-mobile.component.html',
  styleUrls: ['./admin-layout-mobile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    AdminHeaderModule,
    AdminMenuComponent,
    MatSidenavModule,
    RouterModule,
  ]
})
export class AdminLayoutMobileComponent implements OnInit {

  @ViewChild(MatDrawer)
  public sidenav?: MatDrawer;

  constructor(
    private store: Store,
  ) { }

  public ngOnInit(): void {
    this.store.select(selectIsAdminMenuOpen)
      .subscribe(open => open
        ? this.sidenav?.open()
        : this.sidenav?.close());
  }
  
  closedStart() {
    this.store.dispatch(AdminActions.toggleMenu());
  }
}
