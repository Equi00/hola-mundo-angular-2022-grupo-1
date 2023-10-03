import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatSidenavModule } from '@angular/material/sidenav'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { AppRoutingModule } from '../app-routing.module'

import { MyItineraryComponent } from './my-itinerary.component'
import { MyItineraryPipe } from './my-itinerary.pipe'

describe('MyItineraryComponent', () => {
  let component: MyItineraryComponent
  let fixture: ComponentFixture<MyItineraryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyItineraryComponent, MyItineraryPipe],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        CommonModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(MyItineraryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
