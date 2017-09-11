import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import * as userActions from '../actions/user.actions';
import { User } from '../models/user.model';

export type Action = userActions.All;

@Injectable()
export class UserEffects {
    constructor(private actions: Actions, private afAuth: AngularFireAuth) { }

    @Effect()
    getUser: Observable<Action> = this.actions.ofType(userActions.GET_USER)
        .map((action: userActions.GetUser) => action.payload)
        .switchMap(payload => this.afAuth.authState)
        // .delay(2000) // delay to show loading spinner, delete me!
        .map(authData => {
            if (authData) {
                /// User logged in
                const user = new User(authData.uid, authData.displayName);
                return new userActions.Authenticated(user);
            } else {
                /// User not logged in
                return new userActions.NotAuthenticated();
            }
        })
        .catch(err => Observable.of(new userActions.AuthError()));


    @Effect()
    login: Observable<Action> = this.actions.ofType(userActions.GOOGLE_LOGIN)
        .map((action: userActions.GoogleLogin) => action.payload)
        .switchMap(payload => {
            return Observable.fromPromise(this.googleLogin());
        })
        .map(credential => {
            // successful login
            return new userActions.GetUser();
        })
        .catch(err => {
            return Observable.of(new userActions.AuthError({ error: err.message }));
        });


    @Effect()
    logout: Observable<Action> = this.actions.ofType(userActions.LOGOUT)
        .map((action: userActions.Logout) => action.payload)
        .switchMap(payload => {
            return Observable.of(this.afAuth.auth.signOut());
        })
        .map(authData => {
            return new userActions.NotAuthenticated();
        })
        .catch(err => Observable.of(new userActions.AuthError({ error: err.message })));


    private googleLogin(): firebase.Promise<any> {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
    }
}
