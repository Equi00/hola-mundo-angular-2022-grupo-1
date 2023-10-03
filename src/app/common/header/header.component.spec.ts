import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing'
import { CommonModule, Location } from '@angular/common'

import { HeaderComponent } from './header.component'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AppRoutingModule, routes } from 'src/app/app-routing.module'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { MatSidenavModule } from '@angular/material/sidenav'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'

let location: Location
describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
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
      declarations: [HeaderComponent]
    }).compileComponents()

    location = TestBed.get(Location)

    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('when logo is clicked, the page changes to main', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement
    compiled.querySelector('[data-testid="logo"]').click()
    tick()
    expect(location.path()).toBe('/main')
  }))

  it('when logout is clicked, the page changes to login', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement
    compiled.querySelector('[data-testid="logout"]').click()
    tick()
    expect(location.path()).toBe('/login')
  }))

  it('when profile is clicked, the page changes to profile', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement
    compiled.querySelector('[data-testid="profile"]').click()
    tick()
    expect(location.path()).toBe('/profile')
  }))

  it('when my itinerary is clicked, the page changes to my itinerary', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement
    compiled.querySelector('[data-testid="my-itinerary"]').click()
    tick()
    expect(location.path()).toBe('/my-itinerary')
  }))

  it('when home is clicked, the page changes to main', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement
    compiled.querySelector('[data-testid="home"]').click()
    tick()
    expect(location.path()).toBe('/main')
  }))
})
