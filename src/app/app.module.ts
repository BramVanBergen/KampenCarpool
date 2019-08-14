import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgBootstrapModule} from './sharedModules/ng-bootstrap.module';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginModule} from './login/login.module';
import {DriversModule} from './drivers/drivers.module';
import {OverviewModule} from './overview/overview.module';
import {ErrorComponent} from './error/error.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {CampsModule} from './camps/camps.module';
import {HttpClientModule} from '@angular/common/http';
import {AddCampModule} from './add-camp/add-camp.module';
import {AddDriverModule} from './add-driver/add-driver.module';
import {FormsModule} from '@angular/forms';

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
    FormsModule,
    LoginModule,
    DriversModule,
    OverviewModule,
    CampsModule,
    AddCampModule,
    AddDriverModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),  // nodig voor alles
    AngularFirestoreModule.enablePersistence(),             // Cloud Firestore (met offline data persistence)
    AngularFireAuthModule,                                  // Firebase Auth
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
