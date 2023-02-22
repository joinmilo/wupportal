import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuItemEntity } from './../../../../../schema/schema';

@Component({
  selector: 'app-portal-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class PortalFooterComponent {

  public footer?: Observable<MenuItemEntity[]>

  constructor(private store: Store) {

  }
}
