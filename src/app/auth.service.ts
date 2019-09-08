import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, empty, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((userCreditals) => {
      this.userService.save(userCreditals.user);
      this.router.navigateByUrl(localStorage.getItem('returnUrl'));
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$() {
    return this.user$.pipe(
      switchMap(user => user ? this.userService.get(user.uid) : of(null)));
  }
}


