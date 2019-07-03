import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DriversComponent} from './drivers/drivers.component';
import {CalendarComponent} from './calendar/calendar.component';
import {OverviewComponent} from './overview/overview.component';
import {ErrorComponent} from './error/error.component';

const routes: Routes = [
  {path: 'drivers', component: DriversComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'overview', component: OverviewComponent},
  {path: 'login', component: LoginComponent},
  {path: '404', component: ErrorComponent},
  // Homepage doorverwijzen naar overview
  {path: '', redirectTo: 'overview', pathMatch: 'full'},
  // Niet gedefinieerde routes ook doorverwijzen. Zoniet krijg je fouten in de console!
  {path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
