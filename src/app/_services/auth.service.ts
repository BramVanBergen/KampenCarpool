import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_interfaces/user';
import {AlertBox} from '../_interfaces/alert-box';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {decode} from '@angular/router/src/url_tree';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  alertBox$: BehaviorSubject<AlertBox> = new BehaviorSubject(null);
  userData$: BehaviorSubject<User> = new BehaviorSubject(null);

  private admins$: Observable<any>;
  private adminList$: Observable<any>;
  private adminstring = '';

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
    this.clearLocalStorage();

    const local = this;
    const prom = new Promise(
      function (resolve, reject) {
        local.getAdminList().subscribe(admins => {
          admins.forEach(admin => {
            local.adminstring += '/' + admin.UID.toString();
          });
          local.setLocalStorage('Admins', local.adminstring);
          while (true) {
            if (local.getLocalStorage('Admins') !== null) {
              resolve();
              break;
            }
          }
        });
      }
    );

    prom.then(() => {
      this.afAuth.authState.subscribe((user) => {
        this.setUserData(user);
      });
    });


    // this.test().then(bool => {
    //   if (bool) {
    //
    //   }
    // });
  }

  // Email/password sing up
  emailSignUp(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.afAuth.auth.currentUser.sendEmailVerification()
          .then(success => {
            this.logout();
            this.setMessage(`A confirmation email has send.<br>
                            Please check your mailbox`, 'alert-success');
          })
          .catch(error => this.setMessage(error, 'alert-danger'));
      })
      .catch(error => {
        this.setMessage(error.message, 'alert-danger');
      });
  }

  // Reset password
  emailResetPassword(email: string) {
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => this.setMessage('Please check your email', 'alert-success'))
      .catch(error => this.setMessage(error, 'alert-danger'));
  }

  // Email/password login
  emailLogin(email: string, password: string) {
    this.logout();
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        if (!user.user.emailVerified) {
          this.logout();
          this.setMessage(`Please confirm your registration!<br>
                        Check your mailbox: ${user.user.email}`, 'alert-danger');
        } else {
          this.setUserData(user.user);
        }
      })
      .catch(error => this.setMessage(error.message, 'alert-danger'));
  }

  // Social logins
  googleLogin() {
    this.logout();
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .catch(error => this.setMessage(error.message, 'alert-danger'));
  }

  // Logout
  logout() {
    this.clearMessage();
    this.afAuth.auth.signOut();
    this.userData$.next(null);
  }


  // Message BS4 alert-box
  setMessage(msg: string, color: string) {
    this.alertBox$.next({
      message: msg,
      color: color
    });
  }

  clearMessage() {
    this.alertBox$.next(null);
  }

  // Copy fields from authState to userData$
  private setUserData(user) {
    if (user !== null) {
      if (this.getLocalStorage('Admins').toString().indexOf(user.uid) !== -1) {
        this.userData$.next({
          uid: user.uid,
          displayName: user.displayName || user.email,
          photoURL: user.photoURL || 'https://api.adorable.io/avatars/285/' + user.email,
          email: user.email,
          role: 'Admin'
        });
        console.log('Admin');
        this.router.navigate(['/camps']);
      } else {
        this.userData$.next({
          uid: user.uid,
          displayName: user.displayName || user.email,
          photoURL: user.photoURL || 'https://api.adorable.io/avatars/285/' + user.email,
          email: user.email,
          role: 'User'
        });
        console.log('User');
        this.router.navigate(['/drivers']);
      }
    } else {
      this.userData$.next(null);
    }
  }

  getAdminList() {
    this.admins$ = this.afs.collection('Admins').valueChanges();

    return this.admins$;
  }

  // LOCALSTORAGE
  // Clear localstorage
  clearLocalStorage() {
    localStorage.clear();
  }

  // Set localstorage
  setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  // Get localStorage
  getLocalStorage(key) {
    return localStorage.getItem(key);
  }
}
