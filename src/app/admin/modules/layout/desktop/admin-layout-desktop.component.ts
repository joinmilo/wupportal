import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { AdminHeaderModule } from '../../header/admin-header.module';
import { AdminMenuComponent } from '../../menu/admin-menu.component';

@Component({
  selector: 'app-admin-layout-desktop',
  templateUrl: './admin-layout-desktop.component.html',
  styleUrls: ['./admin-layout-desktop.component.scss'],
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
export class AdminLayoutDesktopComponent {

  @ViewChild(MatDrawer)
  public sidenav?: MatDrawer;

  constructor(
    private store: Store,
  ) { }

  // public ngOnInit(): void {
  //   this.store.select(selectIsAdminMenuOpen)
  //     .subscribe(open => open
  //       ? this.sidenav?.open()
  //       : this.sidenav?.close());
  // }
}
