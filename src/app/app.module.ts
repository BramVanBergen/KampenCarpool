import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgBootstrapModule} from './sharedModules/ng-bootstrap.module';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginModule} from './login/login.module';
import {CalendarModule} from './calendar/calendar.module';
import {DriversModule} from './drivers/drivers.module';
import {OverviewModule} from './overview/overview.module';
import {ErrorComponent} from './error/error.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {CampsModule} from './camps/camps.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgBootstrapModule,
    LoginModule,
    CalendarModule,
    DriversModule,
    OverviewModule,
    CampsModule,
    AngularFireModule.initializeApp(environment.firebase),  // nodig voor alles
    AngularFirestoreModule.enablePersistence(),             // Cloud Firestore (met offline data persistence)
    AngularFireAuthModule,                                  // Firebase Auth
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
