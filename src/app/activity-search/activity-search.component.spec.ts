import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatSidenavModule } from '@angular/material/sidenav'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { AppRoutingModule, routingComponents } from '../app-routing.module'

import { ActivityComponent } from './activity-search.component'
import { ActivityFilter } from './activity-search.pipe'
import { activityHttpClientSpy } from './activityHttpSpy'

describe('ActivityComponent', () => {
  let component: ActivityComponent
  let fixture: ComponentFixture<ActivityComponent>
  let routerSpy: jasmine.SpyObj<Router>
  let toastSpy: jasmine.SpyObj<ToastrService>

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])
    toastSpy = jasmine.createSpyObj('ToastrService', ['success', 'error'])

    await TestBed.configureTestingModule({
      declarations: [ActivityFilter, ActivityComponent, routingComponents],
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
      providers: [{ provide: HttpClient, useValue: activityHttpClientSpy }]
    }).compileComponents()
    TestBed.overrideComponent(ActivityComponent, {
      set: {
        providers: [{ provide: Router, useValue: routerSpy }]
      }
    })
    fixture = TestBed.createComponent(ActivityComponent)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Should initially show 3 activities', () => {
    expect(component.activitiesRecieved.length).toBe(3)
  })

  it('When searching for "SENDE" should show 1 activity', async () => {
    getByTestId('search-input').value = 'SENDE'
    component.activityToSearch = 'SENDE'
    await await getByTestId('search-button').click()

    fixture.detectChanges()

    const resultHTML = fixture.debugElement.nativeElement
    expect(
      resultHTML.querySelectorAll('[data-testid="activities"]').length
    ).toBe(1)
  })

  it('Returns same collection of activities when the search is empty', async () => {
    await await getByTestId('search-button').click()

    fixture.detectChanges()

    const resultHTML = fixture.debugElement.nativeElement
    expect(
      resultHTML.querySelectorAll('[data-testid="activities"]').length
    ).toBe(3)
  })

  it('Returns nothing when the search finds no activity', async () => {
    getByTestId('search-input').value = '3453453455'
    component.activityToSearch = '3453453455'
    await await getByTestId('search-button').click()

    fixture.detectChanges()

    const resultHTML = fixture.debugElement.nativeElement
    expect(
      resultHTML.querySelectorAll('[data-testid="activities"]').length
    ).toBe(0)
  })

  //it('when an activity is clicked, the page changes to my itinerary', () => {
  //  getByTestId('actividad').click()

  //  const route = routerSpy.navigate.calls.first().args[0]
  //  expect(route[0]).toBe('/itinerary')
  //  expect(route[2]).toBe('edit')
  //})

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }
})
