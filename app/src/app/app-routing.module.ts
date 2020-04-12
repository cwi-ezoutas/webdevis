import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandmarkComponent} from "./landmark/landmark.component";
import { AdminloginComponent } from "./adminlogin/adminlogin.component";
import { AdminlistComponent} from "./adminlist/adminlist.component";
import {AdmineditComponent} from "./adminedit/adminedit.component";

//Auth guard helper in order to validate login for certain routes.
import { AuthGuard } from './_helpers/auth.guard';



const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'landmark/:landmarkId/:landmarkTitle', component: LandmarkComponent,pathMatch: 'full'},
  { path: 'admin/login', component: AdminloginComponent, pathMatch: 'full'},
  { path: 'admin/list', component: AdminlistComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'admin/edit/:landmarkId/:landmarkTitle', component: AdmineditComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
