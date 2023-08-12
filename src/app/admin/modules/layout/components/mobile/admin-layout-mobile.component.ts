import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { AdminActions } from 'src/app/admin/state/admin.actions';
import { selectIsAdminMenuOpen } from 'src/app/admin/state/admin.selectors';

@Component({
  selector: 'app-admin-layout-mobile',
  templateUrl: './admin-layout-mobile.component.html',
  styleUrls: ['./admin-layout-mobile.component.scss']
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
