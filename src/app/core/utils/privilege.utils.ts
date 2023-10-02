import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { AuthService } from '../services/auth.service'
import { CoreUserActions } from '../state/actions/core-user.actions'
import { Privilege } from '../typings/privilege'

export const requireAnyPrivilege = (...privileges: Privilege[]): CanActivateFn =>
  () => {
    const hasPrivilege = inject(AuthService).hasAnyPrivileges(privileges);

    if (!hasPrivilege) {
      inject(Router).navigate(['/']);
    }

    return hasPrivilege;
  }

export const isAuthenticated = (): CanActivateFn =>
  () => {
    const isAuthenticated = !!inject(AuthService).tokens?.access

    if (!isAuthenticated) {
      inject(Store).dispatch(CoreUserActions.requireLogin());
    }

    return isAuthenticated;
  };