import { Component, OnInit } from '@angular/core'
import { Itinerary } from './../domain/itinerary/itinerary'
import { ItineraryService } from '../services/itinerary.service'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { User } from '../domain/user/user'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user!: User
  itineraries: Array<Itinerary> = []
  filterPipe = ''

  result!: number

  constructor(
    private itineraryService: ItineraryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verifyUserIsLogedIn()
    this.itineraryService.deselect()

    this.itineraryService.getAll().then((data) => {
      this.itineraries = data
    })
    this.result = this.itineraries.length
  }

  verifyUserIsLogedIn() {
    this.user = this.authService.getLogedUser()
    if (!this.user) this.router.navigate(['/login'])
  }
}
