import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Itinerary } from '../domain/itinerary/itinerary'
import { User } from '../domain/user/user'
import { AuthService } from '../services/auth.service'
import { ItineraryService } from '../services/itinerary.service'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-my-itinerary',
  templateUrl: './my-itinerary.component.html',
  styleUrls: ['../main/main.component.css']
})
export class MyItineraryComponent implements OnInit {
  itineraries: Array<Itinerary> = []
  user!: User
  result!: number

  constructor(
    private itineraryService: ItineraryService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.verifyUserIsLogedIn()
    this.itineraryService.deselect()

    this.itineraries = await this.itineraryService.getAll()
    this.result = this.itineraries.filter(
      (itinerary) => itinerary.creator.id == this.user.id
    ).length
  }

  async verifyUserIsLogedIn() {
    this.user = await this.authService.getLogedUser()
    if (!this.user) this.router.navigate(['/login'])
  }
}
