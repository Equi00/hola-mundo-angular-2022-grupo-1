import { DestinationDTO } from './../../dto/destinationDTO'
import { User } from '../user/user'

interface BaseData {
  id: number
}

export class Destination implements BaseData {
  id!: number
  name!: string
  countryOfResidence!: string

  private static LOCAL = 'Argentina'
  private static MAX_ANTIQUITY = 15

  constructor(
    public country: string = '',
    public city: string = '',
    public baseCost: number = 0
  ) {}

  toJSON(): DestinationDTO {
    return {
      id: this.id,
      country: this.country,
      city: this.city,
      baseCost: this.baseCost
    }
  }

  antiquityMax(topValue: number): number {
    return this.antiquityMax(topValue)
  }

  isLocal(): boolean {
    return this.country == Destination.LOCAL
  }

  totalCostFor(user: User): number {
    console.info(
      '',
      this.baseCost,
      ' ',
      this.localAddedCost(),
      ' ',
      this.sameCountryDiscount(user)
    )
    return (
      this.baseCost + this.localAddedCost() - this.sameCountryDiscount(user)
    )
  }

  isValid(): boolean {
    return !this.countryIsNull() && !this.cityIsNull() && this.baseCostIsValid()
  }

  private localAddedCost(): number {
    return this.baseCost * (!this.isLocal() ? 0.2 : 0)
  }

  private isFromThisCountry(user: User): boolean {
    return this.country.toLowerCase() == user.countryOfResidence.toLowerCase()
  }

  private sameCountryDiscount(user: User): number {
    console.info('Cuenta 1 ', user.antiquityMax(Destination.MAX_ANTIQUITY))
    return this.isFromThisCountry(user)
      ? this.baseCost * (0.01 * user.antiquityMax(Destination.MAX_ANTIQUITY))
      : 0
  }

  private countryIsNull(): boolean {
    return this.country.length == 0
  }

  private cityIsNull(): boolean {
    return this.city.length == 0
  }

  private baseCostIsValid(): boolean {
    return this.baseCost > 0
  }
}
