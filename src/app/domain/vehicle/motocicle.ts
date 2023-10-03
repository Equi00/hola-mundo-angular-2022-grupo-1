import VehicleDTO from 'src/app/dto/vehicleDTO'
import { Vehicle } from './vehicle'

export class Motocicle extends Vehicle {
  constructor(
    public override brand: string = '',
    public override model: string = '',
    public override fabricationYear: number = 2000,
    public override dayCost: number = 500,
    public override freeMilage: boolean = true,
    public cylinderCapacity: number = 2
  ) {
    super(brand, model, fabricationYear, dayCost, freeMilage)
    this.cylinderCapacity = cylinderCapacity
  }

  rechargeDays(rentalDays: number): number {
    return this.cylinderCapacity > 250 ? rentalDays * 500 : 0
  }

  override toJSON(): VehicleDTO {
    return {
      id: this.id,
      brand: this.brand,
      model: this.model,
      fabricationYear: this.fabricationYear,
      dayCost: this.dayCost,
      freeMilage: this.freeMilage,
      type: 'Motocicle',
      cylinderCapacity: this.cylinderCapacity
    }
  }

  override isMotocicle(): boolean {
    return true
  }
}
