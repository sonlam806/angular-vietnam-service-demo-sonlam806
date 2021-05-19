import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = new BehaviorSubject<User>({
    name: 'shindo',
    likes: 0,
    dislikes: 0
  });

  login() {
    return this.user;
  }
}
