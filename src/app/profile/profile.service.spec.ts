/* tslint:disable:no-unused-variable */

import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { TestBed, async, inject } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatSidenavModule } from '@angular/material/sidenav'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { AppRoutingModule } from '../app-routing.module'
import { ProfileService } from './profile.service'

describe('Service: Profile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService],
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
    })
  })

  it('should ...', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy()
  }))
})
