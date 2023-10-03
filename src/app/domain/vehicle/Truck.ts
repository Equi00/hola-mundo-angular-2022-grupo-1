import VehicleDTO from 'src/app/dto/vehicleDTO'
import { Vehicle } from './vehicle'

export class Truck extends Vehicle {
  private rentalRecharge = 1000
  private truckRecharge = 10000

  constructor(
    public override brand: string = '',
    public override model: string = '',
    public override fabricationYear: number = 2000,
    public override dayCost: number = 500,
    public override freeMilage: boolean = true,
    public is4x4: boolean = true
  ) {
    super(brand, model, fabricationYear, dayCost, freeMilage)
    this.is4x4 = is4x4
  }

  rechargeDays(rentalDays: number): number {
    return (
      (this.truckRecharge + this.rechargeForExcessDays(rentalDays)) *
      this.percentageRechargeFor4x4()
    )
  }

  override toJSON(): VehicleDTO {
    return {
      id: this.id,
      brand: this.brand,
      model: this.model,
      fabricationYear: this.fabricationYear,
      dayCost: this.dayCost,
      freeMilage: this.freeMilage,
      type: 'Truck',
      is4x4: this.is4x4
    }
  }

  override isTruck(): boolean {
    return true
  }

  private percentageRechargeFor4x4(): number {
    return this.is4x4 ? 1.5 : 1
  }

  private rechargeForExcessDays(rentalDays: number): number {
    return Math.max(rentalDays - 7, 0) * this.rentalRecharge
  }
}
