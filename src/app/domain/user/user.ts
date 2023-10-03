import { VehiclePreference, Neophyte, Combined } from './vehiclePreference'
import { Personality, PersonalityRelaxed } from './personality'
import { Destination } from '../destination/destination'
import { Itinerary } from '../itinerary/itinerary'
import { Activity } from '../activity/activity'
import UserDTO from '../../dto/userDTO'
import { differenceInYears } from 'date-fns/esm'

interface BaseData {
  id: number
}

export class User implements BaseData {
  constructor(
    public name: string = '',
    public surname: string = '',
    public userName: string = '',
    public initialDate = new Date(),
    public countryOfResidence: string = ''
  ) {}

  id!: number
  friends: Array<User> = []
  desiredDestinations: Array<Destination> = []
  travelDays = 0
  visitedDestinations: Array<Destination> = []
  vehiclePreference: VehiclePreference = new Neophyte()
  itineraries: Array<Itinerary> = []
  personality: Personality = new PersonalityRelaxed()
  email!: string
  itinerariesToRate: Array<Itinerary> = []
  antiquity!: number

  toJSON(): UserDTO {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
      userName: this.userName,
      initialDate: this.initialDate,
      countryOfResidence: this.countryOfResidence,
      email: this.email,
      travelDays: this.travelDays,
      vehiclePreference: this.vehiclePreference.toJson(),
      personality: this.personality.toJSON(),
      desiredDestinations: this.desiredDestinations.map((d) => d.toJSON()),
      visitedDestinations: this.visitedDestinations.map((d) => d.toJSON()),
      itineraries: this.itineraries.map((i) => i.toJSON()),
      itinerariesToRate: this.itinerariesToRate.map((i) => i.toJSON()),
      antiquity: this.antiquity,
      friends: this.friends.map((f) => f.toJSON())
    }
  }

  convertPersonalityToString(): string {
    return this.personality.name
  }

  convertVehiclePreferenceToString(): Array<string> {
    if (this.vehiclePreference instanceof Combined) {
      const prefCombined = this.vehiclePreference.vehiclePersonalities
      return prefCombined.map((pref) => pref.name)
    } else return [this.vehiclePreference.name]
  }

  antiquityMax(topValue: number): number {
    console.log('topValue', topValue)
    console.log('this.antiquity', this.antiquity)
    return topValue < this.antiquity ? topValue : this.antiquity
  }

  isValid(): boolean {
    return (
      this.isNotEmptyData() &&
      this.initialDateIsValid() &&
      this.travelDaysIsValid() &&
      this.thereIsDesiredDestination()
    )
  }

  canRateItinerary(itinerary: Itinerary): boolean {
    return (
      !itinerary.isTheCreatorUser(this) &&
      this.isVisitedDestination(itinerary.destination)
    )
  }

  rateItinerary(itinerary: Itinerary, score: number) {
    if (this.canRateItinerary(itinerary)) {
      itinerary.addScore(score, this)
    } else {
      throw Error('El itinerario no puede ser puntuado por este usuario!!')
    }
  }

  canDoItinerary(itinerary: Itinerary): boolean {
    return (
      this.enoughtDaysToTravel(itinerary) &&
      this.personality.canDoItinerary(this, itinerary)
    )
  }

  createItinerary(destination: Destination, activities: Array<Activity>) {
    this.addItinerary(new Itinerary(this, destination))
  }

  canEditItinerary(itinerary: Itinerary): boolean {
    return (
      itinerary.isTheCreatorUser(this) ||
      (itinerary.creator.isFriend(this) &&
        this.isVisitedDestination(itinerary.destination))
    )
  }

  isFriend(user: User): boolean {
    return this.friends.includes(user)
  }

  addFriend(user: User) {
    if (!this.isFriend(user)) this.friends.push(user)
  }

  removeFriend(user: User) {
    this.friends.splice(this.friends.indexOf(user), 1)
  }

  knowDestination(destination: Destination): boolean {
    return this.visitedDestinations.includes(destination)
  }

  changePersonality(personality: Personality) {
    this.personality = personality
  }

  isDesiredDestination(destination: Destination): boolean {
    return this.desiredDestinations.includes(destination)
  }

  addVisitDestination(destination: Destination) {
    this.visitedDestinations.push(destination)
  }

  addDesiredDestination(destination: Destination) {
    this.desiredDestinations.push(destination)
  }

  removeDesiredDestination(destination: Destination) {
    this.desiredDestinations.splice(
      this.desiredDestinations.indexOf(destination),
      1
    )
  }

  changeTravelDays(newDays: number) {
    this.travelDays = newDays
  }

  changeVehiclePreference(vehiclePreference: VehiclePreference) {
    this.vehiclePreference = vehiclePreference
  }

  doTrip(itinerary: Itinerary) {
    this.addVisitDestination(itinerary.destination)
  }

  addItineraryToRate(itinerary: Itinerary) {
    this.itinerariesToRate.push(itinerary)
  }

  clearItineraryToRate() {
    this.itinerariesToRate = []
  }

  friendWithLessVisitedDestination(): User {
    const visitedDestinationListSize = this.friends
      .map((friend) => friend.visitedDestinations.length)
      .sort((n1, n2) => n1 - n2)
    const minimumValue = visitedDestinationListSize[0]
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.friends.find(
      (friend) => friend.visitedDestinations.length == minimumValue
    )!
  }

  addAllItineraries(itineraries: Array<Itinerary>) {
    this.itineraries.push.apply(itineraries)
  }

  addAllFriends(newFriends: Array<User>) {
    // eslint-disable-next-line prefer-spread
    this.friends.push.apply(this.friends, newFriends)
  }

  addAllDestinations(destinations: Array<Destination>) {
    // eslint-disable-next-line prefer-spread
    this.desiredDestinations.push.apply(this.desiredDestinations, destinations)
  }

  mostExpensiveDestination(): Destination | undefined {
    const maximumValue: number = this.desiredDestinations
      .map((destination) => destination.totalCostFor(this))
      .sort((n1, n2) => n2 - n1)[0]
    return this.desiredDestinations.find(
      (destination) => destination.totalCostFor(this) == maximumValue
    )
  }

  private isNotEmptyData(): boolean {
    return (
      this.name.length != 0 &&
      this.surname.length != 0 &&
      this.userName.length != 0 &&
      this.countryOfResidence.length != 0
    )
  }

  private initialDateIsValid(): boolean {
    return this.initialDate < new Date()
  }

  private travelDaysIsValid(): boolean {
    return this.travelDays > 0
  }

  private thereIsDesiredDestination(): boolean {
    return this.desiredDestinations.length > 0
  }

  private isVisitedDestination(destination: Destination): boolean {
    return this.visitedDestinations.includes(destination)
  }

  private enoughtDaysToTravel(itinerary: Itinerary): boolean {
    return this.travelDays >= itinerary.numberOfDays()
  }

  private addItinerary(itinerary: Itinerary) {
    this.itineraries.push(itinerary)
  }
}
