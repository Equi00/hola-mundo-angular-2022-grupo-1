import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick
} from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatSidenavModule } from '@angular/material/sidenav'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { ToastrModule } from 'ngx-toastr'
import { AppRoutingModule, routingComponents } from '../app-routing.module'
import userStub from '../domain/user/user.stub'
import { AuthService } from '../services/auth.service'
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component'

import { VehicleComponent } from './vehicle.component'
import { VehicleFilter } from './vehicle.pipe'
import { vehicleHttpClientSpy } from './vehicleHttpSpy'

describe('VehicleComponent', () => {
  let component: VehicleComponent
  let fixture: ComponentFixture<VehicleComponent>
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])

    await TestBed.configureTestingModule({
      declarations: [VehicleFilter, VehicleCardComponent, routingComponents],
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
        { provide: HttpClient, useValue: vehicleHttpClientSpy },
        AuthService
      ]
    }).compileComponents()

    TestBed.overrideComponent(VehicleComponent, {
      set: {
        providers: [{ provide: Router, useValue: routerSpy }]
      }
    })

    const authService = TestBed.inject(AuthService)
    authService.userLogedIn = userStub

    fixture = TestBed.createComponent(VehicleComponent)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Should initially show 3 vehicles', () => {
    expect(component.vehiclesRecieved.length).toBe(3)
  })

  it('When searching for "honda" should show 1 vehicle', async () => {
    getByTestId('input-search').value = 'honda'
    component.vehicleToSearch = 'honda'
    await await getByTestId('search-button').click()

    fixture.detectChanges()

    const resultHTML = fixture.debugElement.nativeElement
    expect(
      resultHTML.querySelectorAll('[data-testid="vehicle-card"]').length
    ).toBe(1)
  })

  it('When a card is clicked its class should be "vehicle-selected"', async () => {
    await getByTestId('vehicle-card-comp-1').click()

    fixture.detectChanges()

    const vehicleSelected =
      fixture.debugElement.nativeElement.querySelectorAll('.vehicle-selected')

    expect(vehicleSelected.length).toBe(1)
    expect(
      vehicleSelected[0].querySelector(`[data-testid="vehicle-brand-text"]`)
        .innerHTML
    ).toBe('Honda')
  })

  it('When a card selected is clicked its class shouldn\'t be "vehicle-selected"', async () => {
    await getByTestId('vehicle-card-comp-1').click()
    fixture.detectChanges()
    await getByTestId('vehicle-card-comp-1').click()
    fixture.detectChanges()

    const vehicleSelected =
      fixture.debugElement.nativeElement.querySelectorAll('.vehicle-selected')

    expect(vehicleSelected.length).toBe(0)
  })

  it('Press "Volver" button should navigate', () => {
    getByTestId('back-button').click()

    const route = routerSpy.navigate.calls.first().args[0]
    expect(route[0]).toBe('/itinerary')
    expect(route[2]).toBe('view')
  })

  it('Press "Comprar"/"Omitir" button should navigate', fakeAsync(() => {
    getByTestId('buy-omit-button').click()

    fixture.detectChanges()

    tick(2500)
    const route = routerSpy.navigate.calls.first().args[0]
    console.info(route)
    expect(route[0]).toBe('/main')
    tick(3000)
    flush()
  }))

  it('Press "Comprar"/"Omitir" button should disable buttons', fakeAsync(() => {
    getByTestId('buy-omit-button').click()

    fixture.detectChanges()

    tick(1000)
    expect(getByTestId('buy-omit-button').disabled).toBe(true)
    expect(getByTestId('back-button').disabled).toBe(true)
    tick(1500)
    flush()
  }))

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }
})
