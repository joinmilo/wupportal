import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { userUrl } from 'src/app/core/constants/core.constants';
import { CoreModule } from 'src/app/core/core.module';
import { CoreUserActions } from 'src/app/core/state/actions/core-user.actions';
import { selectIsAuthenticated } from 'src/app/core/state/selectors/user.selectors';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,

    FontAwesomeModule,
    MatButtonModule,
    MatMenuModule,
  ]
})
export class HeaderUserComponent {

  constructor(
    private router: Router,
    private store: Store) { }

  public route(route?: string): void {
    this.store.select(selectIsAuthenticated)
      .pipe(take(1))
      .subscribe(isAuthenticated => isAuthenticated
        ? this.router.navigate([userUrl, route])
        : this.store.dispatch(CoreUserActions.requireLogin()));
  }

  public logout(): void {
    this.store.dispatch(CoreUserActions.logout());
    this.router.navigate(['/']);
  }
}