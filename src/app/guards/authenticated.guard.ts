import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router
} from '@angular/router';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard
  implements CanLoad, CanActivate, CanActivateChild {
  constructor(private readonly router: Router) {}

  canLoad() {
    return this.isAuth$();
  }

  canActivate() {
    return this.isAuth$();
  }

  canActivateChild() {
    return this.isAuth$();
  }

  getLoginStatus() {
    return localStorage.getItem('user_data') ? true : false;
  }

  private isAuth$() {
    return of(this.getLoginStatus()).pipe(
      tap(isAuth => {
        console.log('isAuth', isAuth);
        if (!isAuth) {
          this.router.navigate(['/not-auth']);
        }
      })
    );
  }
}
