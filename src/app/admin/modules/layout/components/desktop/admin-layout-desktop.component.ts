import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { selectIsAdminMenuOpen } from 'src/app/admin/state/admin.selectors';

@Component({
  selector: 'app-admin-layout-desktop',
  templateUrl: './admin-layout-desktop.component.html',
  styleUrls: ['./admin-layout-desktop.component.scss']
})
export class AdminLayoutDesktopComponent implements OnInit {

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
}
