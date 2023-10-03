import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProfileComponent } from './profile/profile.component'
import { ItineraryComponent } from './itinerary/itinerary.component'
import { ActivityComponent } from './activity-search/activity-search.component'
import { LoginComponent } from './login/login.component'
import { VehicleComponent } from './vehicle/vehicle.component'
import { MainComponent } from './main/main.component'
import { MyItineraryComponent } from './my-itinerary/my-itinerary.component'
import { ErrorComponent } from './common/error/error.component'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'itinerary/:id/add-vehicle', component: VehicleComponent },
  { path: 'itinerary/:id/:mode', component: ItineraryComponent },
  { path: 'main', component: MainComponent },
  { path: 'itinerary/:id/add-activity/:day', component: ActivityComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-itinerary', component: MyItineraryComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [
  LoginComponent,
  VehicleComponent,
  ItineraryComponent,
  MainComponent,
  ActivityComponent,
  ProfileComponent,
  MyItineraryComponent,
  ErrorComponent
]
