import { User } from './../domain/user/user'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ItineraryService } from '../services/itinerary.service'
import { Itinerary } from '../domain/itinerary/itinerary'
import { ItineraryDay } from '../domain/itinerary/itineraryDay'
import { Difficulty } from '../domain/activity/difficulty'
import { Activity } from '../domain/activity/activity'
import { Destination } from '../domain/destination/destination'
import { ToastrService } from 'ngx-toastr'
import { delay } from 'rxjs'
import { Rate } from '../domain/itinerary/rate'
import { DestinationService } from '../services/destination.service'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent implements OnInit {
  itinerary!: Itinerary
  itineraryId!: number
  modeSelection!: string
  destinations!: Array<Destination>
  stars: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  selectedValue = 0
  ratingSent = false
  user!: User

  constructor(
    private itineraryService: ItineraryService,
    private destinationService: DestinationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.verifyUserIsLogedIn()

    this.itineraryId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.modeSelection = this.activatedRoute.snapshot.paramMap.get(
      'mode'
    ) as string

    await this.initialize()

    this.checkRate()
    this.destinationService
      .getAll()
      .then((destinations) => (this.destinations = destinations))
  }

  verifyUserIsLogedIn() {
    this.user = this.authService.getLogedUser()
    if (!this.user) this.router.navigate(['/login'])
  }

  checkRate() {
    const itinerarySelected = this.itinerarySelected()
    this.ratingSent = itinerarySelected
      ? itinerarySelected.rate.hadUserRated(this.user)
      : false
  }

  async initialize() {
    const itinerary = await this.itineraryService.getOne(this.itineraryId)
    if (itinerary) this.itinerary = itinerary
    if (this.itinerarySelected() == undefined)
      this.itineraryService.select(this.itinerary)
  }

  itinerarySelected() {
    return this.itineraryService.itinearySelected
  }
  async rateItinerary() {
    const itinerarySelected = this.itinerarySelected()
    await this.itineraryService.addScore(
      this.selectedValue,
      itinerarySelected ? itinerarySelected : this.itinerary,
      this.user.id
    )

    itinerarySelected?.addScore(this.selectedValue, this.user)
    this.ratingSent = true
  }

  doneEdit() {
    this.modeSelection = 'view'
    this.router.navigate(['itinerary', this.itineraryId, 'view'])
  }

  cancelEdit() {
    this.router.navigate(['main'])
  }

  saveItinerary() {
    const itinerarySelected = this.itinerarySelected()
    this.itineraryService
      .update(itinerarySelected ? itinerarySelected : this.itinerary)
      .subscribe({
        next: () => {
          this.doneEdit()
        },
        error: (error: Error) => {
          this.toastr.error('Error cargando el Itinerario', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-center-center'
          })
        }
      })
  }

  doItinerary() {
    this.router.navigate(['itinerary', this.itineraryId, 'add-vehicle'])
  }

  gotToAddActivity(day: number) {
    this.router.navigate(['itinerary', this.itineraryId, 'add-activity', day])
  }

  getNewActivity(day: ItineraryDay) {
    console.info('Day rec: ', day)
    const itinSelect = this.itinerarySelected()
    this.gotToAddActivity(itinSelect ? itinSelect.days.indexOf(day) + 1 : -1)
  }

  getDifficulty(activity: Activity): string {
    if (activity.difficulty == Difficulty.LOW) return 'low'
    else if (activity.difficulty == Difficulty.MEDIUM) return 'medium'
    else activity.difficulty == Difficulty.HIGH
    return 'high'
  }

  getItineraryDifficulty(itinerary: Itinerary): string {
    if (itinerary.difficulty() == Difficulty.LOW) return 'low'
    else if (itinerary.difficulty() == Difficulty.MEDIUM) return 'medium'
    else itinerary.difficulty() == Difficulty.HIGH
    return 'high'
  }

  getNumberList(number: number): Array<number> {
    const listOfRating: Array<number> = []
    const integerRating: number = Math.trunc(number)

    for (let i = 0; i < integerRating; i++) {
      listOfRating.push(i)
    }
    return listOfRating
  }

  getRatingList(numberOfRate: number): Array<number> {
    return this.getNumberList(numberOfRate)
  }

  getEmptyStars(numberOfRate: number): Array<number> {
    const emptyNumberOfRate = 10 - numberOfRate
    return this.getRatingList(emptyNumberOfRate)
  }

  getRateScore(itinerary: Itinerary): number {
    const totalRates = itinerary.rate.rateInfo.length

    if (totalRates == 0) return 0
    else
      return +(
        itinerary.rate.rateInfo.reduce(
          (acumScore, rate) => acumScore + rate.rateScore,
          0
        ) / totalRates
      ).toFixed(1)
  }

  hasHalfScore(ratingResult: number): boolean {
    return !!(ratingResult % 1)
  }

  countStar(star: any) {
    this.selectedValue = star
  }
}
