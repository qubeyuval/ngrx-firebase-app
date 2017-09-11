import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User } from './models/user.model';
import * as userActions from './actions/user.actions';

import { Post } from './models/post.model';
import * as postActions from './actions/post.actions';

interface AppState {
    user: User;
    post: Post;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    user$: Observable<User>;
    post$: Observable<Post>;

    constructor(private store: Store<AppState>) {
        this.post$ = this.store.select('post');
    }

    ngOnInit() {
        this.user$ = this.store.select('user');

        this.store.dispatch(new userActions.GetUser());
    }

    getPost() {
        this.store.dispatch(new postActions.GetPost('/posts/testPost'));
    }

    vote(post: Post, val: number) {
        this.store.dispatch(new postActions.VoteUpdate({ post, val }));
    }

    googleLogin() {
        this.store.dispatch(new userActions.GoogleLogin());
    }

    logout() {
        this.store.dispatch(new userActions.Logout());
    }
}
