import VehicleDTO from "src/app/dto/vehicleDTO"
import { Vehicle } from "./vehicle"

export class Car extends Vehicle {
    constructor(public override brand: string = '', public override model: string = '', public override fabricationYear: number = 2000, public override dayCost: number = 500, public override freeMilage: boolean = true, public hatchback: boolean = true){
        super(brand, model, fabricationYear, dayCost, freeMilage)
        this.hatchback = hatchback
    }

    rechargeDays(rentalDays: number): number {
        return this.baseCost(rentalDays) * (this.hatchback ?  0.1 : 0.25)
    }

    override toJSON(): VehicleDTO {
        return {
            id: this.id,
            brand: this.brand,
            model: this.model,
            fabricationYear: this.fabricationYear,
            dayCost: this.dayCost,
            freeMilage: this.freeMilage,
            type: 'Car',
            hatchback: this.hatchback
        }
    }

    override isCar(): boolean {
      return true
    }
}
