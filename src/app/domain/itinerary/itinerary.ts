import { ItineraryDay } from './itineraryDay'
import { Rate } from './rate'
import { RateData } from './rateData'
import { Vehicle } from '../vehicle/vehicle'
import { User } from '../user/user'
import { Destination } from '../destination/destination'
import { Activity } from '../activity/activity'
import { Difficulty } from '../activity/difficulty'
import { ItineraryDTO, ItineraryUpdateDTO } from './../../dto/itineraryDTO'

interface BaseData {
  id: number
}

interface NumberOfActivitiesObj {
  difficulty: Difficulty
  numberOfActivities: number
}

export class Itinerary implements BaseData {
  id!: number
  days: Array<ItineraryDay> = []
  rate = new Rate()
  vehicle!: Vehicle

  constructor(
    public creator: User = new User(),
    public destination: Destination = new Destination()
  ) {
    this.creator = creator
    this.destination = destination
  }

  toUpdateJSON(): ItineraryUpdateDTO {
    return {
      id: this.id,
      destination: this.destination.toJSON(),
      days: this.days.map((day) => day.toJSON())
    }
  }

  toJSON(): ItineraryDTO {
    return {
      id: this.id,
      creator: this.creator.toJSON(),
      destination: this.destination.toJSON(),
      vehicle: this.vehicle.toJSON(),
      days: this.days.map((day) => day.toJSON()),
      rate: this.rate.toJSON()
    }
  }

  numberOfDays(): number {
    return this.days.length
  }

  addEmptyDay() {
    this.days.push(new ItineraryDay())
  }

  addEmptyDays(numberOfDays: number) {
    for (let i = 0; i < numberOfDays; i++) {
      this.addEmptyDay()
    }
  }

  totalCost(): number {
    return this.days.reduce(
      (_totalCost, day) => _totalCost + day.totalActivitiesCost(),
      0
    )
  }

  totalActivities(): number {
    return this.days.reduce(
      (_totalActivities, day) => _totalActivities + day.activities.length,
      0
    )
  }

  avarageDurationDay(): number {
    return this.totalActivitiesDuration() / this.totalActivities()
  }

  avarageDurationInDay(activityDay: number): number {
    return this.days[activityDay - 1].averageDuration()
  }

  difficulty() {
    const difficultyQuantity: Array<NumberOfActivitiesObj> =
      this.countNumberOfActivitiesByDifficulty()
    return Difficulty.getDifficultyByPriority(
      Math.max(
        ...this.mostFrequentDifficulty(difficultyQuantity).map(
          (diff) => diff.difficulty.priority
        )
      )
    )
  }

  addScore(score: number, user: User) {
    this.rate.addRate(score, user)
  }

  isAlmostOneActivityPerDay(): boolean {
    return this.days.every((day) => day.isAlmostOneActivity())
  }

  isValid() {
    return (
      this.isAlmostOneActivityPerDay() &&
      !this.isMoreThanOneActivityAtSameTime() &&
      !this.hasBeenScoredMultipleTimesBySameUser() &&
      this.isAllScoresValid() &&
      this.haveAlmostADay()
    )
  }

  isTheCreatorUser(user: User): boolean {
    return user.id === this.creator.id
  }

  getAllActivitiesAsList(): Array<Activity> {
    let activitiesList: Array<Activity> = []
    this.days.forEach(
      (day) => (activitiesList = activitiesList.concat(day.activities))
    )
    return activitiesList
  }

  addDay(day: ItineraryDay) {
    this.days.push(day)
  }

  //New added for itinerary edit
  removeDay(day: ItineraryDay) {
    const index = this.days.indexOf(day)
    this.days.splice(index, 1)
  }

  country(): string {
    return this.destination.country
  }

  city(): string {
    return this.destination.city
  }

  isLocal(): boolean {
    return this.destination.isLocal()
  }

  brandForAgreement(): string {
    return this.vehicle.firstBrandWithAgreement()
  }

  private totalActivitiesDuration(): number {
    return this.days.reduce(
      (total, day) =>
        total +
        day.activities.reduce(
          (totalAct, activity) => totalAct + activity.durationInMinutes(),
          0
        ),
      0
    )
  }

  private isMoreThanOneActivityAtSameTime(): boolean {
    return this.days.some((day) => day.areOverlapedActivities())
  }

  private hasBeenScoredMultipleTimesBySameUser(): boolean {
    return this.rate.isMultipleRatesByOneUser()
  }

  private isAllScoresValid(): boolean {
    return this.rate.isValid()
  }

  private haveAlmostADay(): boolean {
    return this.days.length != 0
  }

  private countNumberOfActivitiesByDifficulty() {
    const difficultyQuantity: Array<NumberOfActivitiesObj> = [
      { difficulty: Difficulty.LOW, numberOfActivities: 0 },
      { difficulty: Difficulty.MEDIUM, numberOfActivities: 0 },
      { difficulty: Difficulty.HIGH, numberOfActivities: 0 }
    ]
    difficultyQuantity.forEach(
      (diff) =>
        (diff.numberOfActivities = this.getAllActivitiesAsList().filter(
          (activity) => activity.difficulty == diff.difficulty
        ).length)
    )
    return difficultyQuantity
  }

  private mostFrequentDifficulty(
    difficultyQuantity: Array<NumberOfActivitiesObj>
  ): Array<NumberOfActivitiesObj> {
    return difficultyQuantity.filter(
      (cf) =>
        cf.numberOfActivities ==
        Math.max(...difficultyQuantity.map((_cf) => _cf.numberOfActivities))
    )
  }
}
