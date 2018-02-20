import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

const firebaseConfig = {
    apiKey: "AIzaSyBCZ8eeoVWpcvzDAJLM5Ee-nS8W1NsWwtc",
    authDomain: "teste-b0dff.firebaseapp.com",
    databaseURL: "https://teste-b0dff.firebaseio.com",
    projectId: "teste-b0dff",
    storageBucket: "teste-b0dff.appspot.com",
    messagingSenderId: "124490090947"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Github,
  method: AuthMethods.Popup
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
