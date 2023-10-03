import { Component, Input, OnInit } from '@angular/core'
import { Itinerary } from 'src/app/domain/itinerary/itinerary'
import { User } from 'src/app/domain/user/user'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-itinerary-card',
  templateUrl: './itinerary-card.component.html',
  styleUrls: ['./itinerary-card.component.css', '../main.component.css']
})
export class ItineraryCardComponent implements OnInit {
  @Input() itinerary!: Itinerary
  @Input() user!: User

  listOfRating: Array<number> = []

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  getRatingList(ratingResult: number): Array<number> {
    this.listOfRating = []
    const integerRating: number = Math.trunc(ratingResult)
    for (let i = 0; i < integerRating; i++) {
      this.listOfRating.push(i)
    }
    return this.listOfRating
  }

  getRateScore(): number {
    const totalRates = this.itinerary.rate.rateInfo.length
    if (totalRates == 0) return 0
    else {
      return (
        this.itinerary.rate.rateInfo.reduce(
          (acumScore, rate) => acumScore + rate.rateScore,
          0
        ) / totalRates
      )
    }
  }

  hasHalfScore(ratingResult: number): boolean {
    if (ratingResult % 2) return true
    else return false
  }

  truncateValue(value: number): number {
    return Math.trunc(value)
  }
}
