import { Injectable, NgZone } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GoogleService } from './google.service';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { merge } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: any;
  tutorial: AngularFireObject<any>;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    public googleService: GoogleService,
    public af: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe(
      (user) => {
        if (user) {
          this.userData = user;

          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }

        this.googleService.changeUserDetail(user);
      },
      (err) => {}
    );
  }

  // Sign in with email/password
  SignIn(email, password) {
    // this.afAuth.auth
    //   .setPersistence(auth.Auth.Persistence.SESSION)
    //   .then(() => {

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.userData = result.user;

        //localStorage.setItem('user', JSON.stringify(this.userData));
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
    // })
    // .catch(function (error) {
    //  // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });
  }

  SetUserData(user) {
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    //   `users/${user.uid}`
    // );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      photo: user.photoURL,
    };
    // return userRef.set(userData, {
    //   merge: true,
    // }); // create new user in database if not there , if there then only update (due to merge true)

    //  const todos: AngularFireList<any> = this.af.list('/users');

    const tutRef = this.af.object(`users/${user.uid}`);
    tutRef.update(userData);

    // const chatsRef = this.af.object(`userChats/${user.uid}`);
    // chatsRef.update({ chatIds: [] });

    //  todos.set(
    //   userData
    //  , {merge:true})
  }

  // Sign up with email/password
  SignUp(email, password) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign in with Google
  GoogleAuth() {
    this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        localStorage.setItem('user', JSON.stringify(result.user));
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // SendVerificationMail() {
  //   this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
  //     this.router.navigate(["verify-email-address"]);
  //   });
  // }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  SignOut() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  currentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
}
