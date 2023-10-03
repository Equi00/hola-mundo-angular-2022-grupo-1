import VehicleDTO from '../../dto/vehicleDTO'

interface BaseData {
  id: number
}

export abstract class Vehicle implements BaseData {
  id!: number
  agreements: Array<string> = ['Honda']

  constructor(
    public brand: string = '',
    public model: string = '',
    public fabricationYear: number = 2000,
    public dayCost: number = 500,
    public freeMilage: boolean = true
  ) {}

  abstract toJSON(): VehicleDTO

  abstract rechargeDays(rentalDays: number): number

  baseCost(rentalDays: number): number {
    return this.dayCost * rentalDays
  }

  discountForAgreement(): number {
    return this.hasAnAgreement() ? 0.9 : 1
  }

  hasAnAgreement() {
    return this.agreements.includes(this.brand)
  }

  totalCost(rentalDays: number) {
    return (
      (this.baseCost(rentalDays) + this.rechargeDays(rentalDays)) *
      this.discountForAgreement()
    )
  }

  firstBrandWithAgreement(): string {
    return this.agreements[0]
  }

  antiquity(): number {
    return new Date().getUTCFullYear() - this.fabricationYear
  }

  addBrandForAgreement(brand: string) {
    this.agreements.concat(brand)
  }

  isTruck() {
    return false
  }

  isCar() {
    return false
  }

  isMotocicle() {
    return false
  }
}
