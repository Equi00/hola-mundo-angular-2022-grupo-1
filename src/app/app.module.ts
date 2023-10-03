import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MatSidenavModule } from '@angular/material/sidenav'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { ProfileComponent } from './profile/profile.component'
import { ItineraryComponent } from './itinerary/itinerary.component'
import { VehicleComponent } from './vehicle/vehicle.component'
import { VehicleFilter } from './vehicle/vehicle.pipe'
import { ActivityFilter } from './activity-search/activity-search.pipe'
import { LoginComponent } from './login/login.component'
import { HeaderComponent } from './common/header/header.component'
import { FooterComponent } from './common/footer/footer.component'
import { ActivityComponent } from './activity-search/activity-search.component'
import { CommonModule } from '@angular/common'
import { MainComponent } from './main/main.component'
import { ItineraryFilter } from './main/main.pipe'
import { MyItineraryComponent } from './my-itinerary/my-itinerary.component'
import { MyItineraryPipe } from './my-itinerary/my-itinerary.pipe'
import { ItineraryCardComponent } from './main/itinerary-card/itinerary-card.component'
import { VehicleCardComponent } from './vehicle/vehicle-card/vehicle-card.component'
import { ToastrModule } from 'ngx-toastr'
import { ErrorComponent } from './common/error/error.component'
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent,
    VehicleComponent,
    VehicleFilter,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    ActivityFilter,
    ActivityComponent,
    ItineraryComponent,
    VehicleCardComponent,
    ProfileComponent,
    MainComponent,
    ItineraryFilter,
    MyItineraryComponent,
    MyItineraryPipe,
    ItineraryCardComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
