import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { PostEffects } from './effects/post.effects';
import { postReducer } from './reducers/post.reducer';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,

        EffectsModule.forRoot([ PostEffects ]),
        StoreModule.forRoot({
            post:  postReducer
        }),

        StoreDevtoolsModule.instrument({ maxAge: 25 })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
