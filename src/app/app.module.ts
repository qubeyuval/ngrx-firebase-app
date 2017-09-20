import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { PostEffects } from './effects/post.effects';
import { UserEffects } from './effects/user.effects';
import { postReducer } from './reducers/post.reducer';
import { userReducer } from './reducers/user.reducer';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,

        EffectsModule.forRoot([
            PostEffects,
            UserEffects
        ]),
        StoreModule.forRoot({
            post:  postReducer,
            user: userReducer
        }),

        StoreDevtoolsModule.instrument({ maxAge: 100 })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
