import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DriversComponent} from './drivers/drivers.component';
import {OverviewComponent} from './overview/overview.component';
import {ErrorComponent} from './error/error.component';
import {CampsComponent} from './camps/camps.component';
import {AddCampComponent} from './add-camp/add-camp.component';
import {AddDriverComponent} from './add-driver/add-driver.component';
import {AuthGuard} from './_guards/auth.guard';
import {RoleGuard} from './_guards/role.guard';

const routes: Routes = [
  {path: 'addCamp', component: AddCampComponent, canActivate: [RoleGuard], data: {role: 'Admin'}},
  {path: 'editCamp/:id', component: AddCampComponent, canActivate: [RoleGuard], data: {role: 'Admin'}},
  {path: 'addDriver', component: AddDriverComponent, canActivate: [AuthGuard]},
  {path: 'camps', component: CampsComponent, canActivate: [RoleGuard], data: {role: 'Admin'}},
  {path: 'drivers', component: DriversComponent, canActivate: [AuthGuard]},
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
  exports: [RouterModule],
})
export class AppRoutingModule {
}
