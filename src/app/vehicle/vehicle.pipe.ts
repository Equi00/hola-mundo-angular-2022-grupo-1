import { Pipe, PipeTransform } from '@angular/core'

import { Vehicle } from '../domain/vehicle/vehicle'

@Pipe({ name: 'vehicleFilter' })
export class VehicleFilter implements PipeTransform {

  transform(vehicles: Vehicle[], toSearch: string): Vehicle[] {
    return vehicles.filter(vehicle => !toSearch ||
                            this.coincide(vehicle.brand, toSearch) ||
                            this.coincide(vehicle.model, toSearch) ||
                            this.coincide(vehicle.fabricationYear.toString(), toSearch))
  }

  coincide(value1: string, value2: string) {
    return value1
      .toLowerCase()
      .match(value2.toLowerCase())
  }
}
