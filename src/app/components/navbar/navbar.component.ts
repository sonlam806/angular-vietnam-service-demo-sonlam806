import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  VERSION
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  template: `
    <nav>
      <h4>Angular Vietnam v{{ version }}</h4>
      <button *ngIf="isLoggedIn; else notLoggedIn" (click)="logOut()">
        I am {{ user?.name }}, and I like {{ user?.likes }} and dislike
        {{ user?.dislikes }} pokemons / Log Out
      </button>
      <ng-template #notLoggedIn>
        <button (click)="logIn()">Log In</button>
      </ng-template>
    </nav>
  `,
  styles: [
    `
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: hotpink;
        color: white;
      }

      h4 {
        margin: 0;
        font-size: 2rem;
      }

      button {
        background: transparent;
        outline: none;
        border: 1px solid;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        font-family: 'Source Sans Pro';
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  version = VERSION.full;
  user: User;
  userSubs: Observable<any>;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    let userData = localStorage.getItem('user_data');
    if (userData) {
      this.user = JSON.parse(userData);
      this.isLoggedIn = true;
    }
  }

  logIn() {
    // TODO: Please replace with a service call
    this.authService.login().subscribe(user => {
      this.user = user;
    });
    this.isLoggedIn = true;
    // save userData to localStorage
    localStorage.setItem('user_data', JSON.stringify(this.user));
    // redirect user to homepage
    this.router.navigate(['/']);
  }

  logOut() {
    // TODO: Please replace with a service call
    this.isLoggedIn = false;
    this.user = null;
    // clear userData to localStorage
    localStorage.removeItem('user_data');
    // redirect user to login page
    this.router.navigate(['/not-auth']);
  }
}
