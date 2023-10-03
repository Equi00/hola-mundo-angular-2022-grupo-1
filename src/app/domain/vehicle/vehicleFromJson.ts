import VehicleDTO from 'src/app/dto/vehicleDTO'
import { Car } from './car'
import { Motocicle } from './motocicle'
import { Truck } from './Truck'

export default function vehicleFromJSON(vehicleDTO: VehicleDTO) {
  return Object.assign(
    vehicleDTO.type == 'Car'
      ? new Car()
      : vehicleDTO.type == 'Motocicle'
      ? new Motocicle()
      : new Truck(),
    vehicleDTO
  )
}
