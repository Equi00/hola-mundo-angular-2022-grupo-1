import { routingComponents } from './../app-routing.module'
import { Activity } from './../domain/activity/activity'
import {
  waitForAsync,
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing'
import { DebugElement } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { daysInWeek } from 'date-fns'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from 'src/app/app-routing.module'
import { By } from '@angular/platform-browser'

import { ItineraryComponent } from './itinerary.component'

import { RouterModule } from '@angular/router'
import { routes } from 'src/app/app-routing.module'
import { CommonModule, Location } from '@angular/common'
import { ItineraryService } from '../services/itinerary.service'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { MatSidenavModule } from '@angular/material/sidenav'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { itineraryHttpClientSpy } from './itineraryHttpSpy'
import { AuthService } from '../services/auth.service'
import { User } from '../domain/user/user'
import { Router } from '@angular/router'
import userStub from '../domain/user/user.stub'

describe('ItineraryComponent: test on components', () => {
  let fixture: ComponentFixture<ItineraryComponent>
  let component: ItineraryComponent
  let service: ItineraryService
  let location: Location
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(async () => {

    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])

    await TestBed.configureTestingModule({
      declarations: [ItineraryComponent, routingComponents],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        CommonModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      providers: [
        ItineraryService,
        { provide: HttpClient, useValue: itineraryHttpClientSpy },
        AuthService
      ]
    }).compileComponents()

    const authService = TestBed.inject(AuthService)
    authService.userLogedIn = userStub

    fixture = TestBed.createComponent(ItineraryComponent)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    component = fixture.componentInstance
  })

  it('The Component should exist', () => {
    expect(component).toBeTruthy()
  })
  
  // it('Button: Add new Day increases quantity of Days', fakeAsync(() => {
  //   fixture.detectChanges()
  //   getDataByTestId('addDay').click()
  //   tick()
  //   expect(component.itinerary.days.length).toBe(3)
  // }))

  // it('Button: Remove Day decreases quantity of Days', fakeAsync(() => {
  //   fixture.detectChanges()
  //   getDataByTestId('removeDay').click()
  //   tick()
  //   expect(component.itinerary.days.length).toBe(1)
  // }))

  /* it('Button: Add new Activity increases quantity of Activities', fakeAsync(() => {
    fixture.detectChanges()
    getDataByTestId('addActivity').click()
    tick()
    expect(component.itinerary.totalActivities()).toBe(3)
  }))
  it('Button: Add new Activity increases quantity of Average Time of Activities', fakeAsync(() => {
    fixture.detectChanges()
    getDataByTestId('addActivity').click()
    tick()
    expect(component.itinerary.avarageDurationDay()).toBe(100)
  }))
  it('Button: Add new Activity increases quantity of Money spent on Activities', fakeAsync(() => {
    fixture.detectChanges()
    let initialCost = component.itinerary.totalCost()
    getDataByTestId('addActivity').click()
    tick()
    expect(component.itinerary.totalCost()).toBeGreaterThan(initialCost)
  }))
  it('Button: Remove Activity decreases quantity of Activities', fakeAsync(() => {
    fixture.detectChanges()
    getDataByTestId('removeActivity').click()
    tick()
    expect(component.itinerary.totalActivities()).toBe(1)
  }))
  it('Button: Remove Activity decreases Average Time of Activities', fakeAsync(() => {
    fixture.detectChanges()
    let initialAverageTime = component.itinerary.avarageDurationDay()
    getDataByTestId('removeActivity').click()
    tick()
    expect(
      component.itinerary.avarageDurationDay() === initialAverageTime
    ).toBeFalse()
  }))
  it('Button: Remove Activity decreases quantity of Money spent on Activities', fakeAsync(() => {
    fixture.detectChanges()
    let initialCost = component.itinerary.totalCost()
    getDataByTestId('removeActivity').click()
    tick()
    expect(component.itinerary.totalCost()).toBeLessThan(initialCost)
  }))
 */
  // it('VIEW: when Do Itinerary is clicked, the page changes to Vehicles', fakeAsync(() => {
  //   getDataByTestId('doItinerary').click()
  //   tick()
  //   expect(location.path()).toBe('/itinerary/:id/add-vehicle')
  // }))

  // it('EDIT: when Add Activity is clicked, the page changes to Activities', fakeAsync(() => {
  //   getDataByTestId('addActivity').click()
  //   tick()
  //   expect(location.path()).toBe('itinerary/:id/add-activity/:day')
  // }))

  // it('EDIT: when Done Edit is clicked, the page changes to Itinerary View', fakeAsync(() => {
  //   getDataByTestId('doneEdit').click()
  //   tick()
  //   expect(location.path()).toBe('/itinerary/:id/view')
  // }))

  // it('EDIT: when Cancel Edit is clicked, the page changes to Main', fakeAsync(() => {
  //   getDataByTestId('cancelEdit').click()
  //   tick()
  //   expect(location.path()).toBe('/main')
  // }))

  function getDataByTestId(testid: string): any {
    return fixture.debugElement.nativeElement.querySelector(
      `[data-testid="${testid}"]`
    )
  }
})
