import { Car } from "../domain/vehicle/car"
import { Motocicle } from "../domain/vehicle/motocicle"
import { Truck } from "../domain/vehicle/Truck"
import { VehicleFilter } from "./vehicle.pipe"

describe('VehicleFilter', () => {
  const vehicles = [
    new Car('Honda', 'A11', 2001, 500, true, true),
    new Motocicle('Lamborgini', 'BB422', 2010, 1500, true, 10),
    new Truck('Honda', 'B45BB4', 1998, 201, true, false),
    new Car('Audi', 'A10', 2005, 500, true, true),
  ]

  it('Create an instance', () => {
    const pipe = new VehicleFilter()
    expect(pipe).toBeTruthy()
  })

  it('Returns same collection of books when no filter is applied', () => {
    const pipe = new VehicleFilter()
    const filteredVehicles = pipe.transform(vehicles, '')
    expect(filteredVehicles.length).toBe(4)
  })

  it('Filters by brand', () => {
    const pipe = new VehicleFilter()
    const filteredVehicles = pipe.transform(vehicles, 'hond')
    expect(filteredVehicles.length).toBe(2)
    expect(filteredVehicles.pop()?.brand).toBe('Honda')
  })

  it('Filters by model', () => {
    const pipe = new VehicleFilter()
    const filteredVehicles = pipe.transform(vehicles, 'bb')
    expect(filteredVehicles.length).toBe(2)
    expect(filteredVehicles.pop()?.model).toBe('B45BB4')
  })

  it('Filters by fabrication year', () => {
    const pipe = new VehicleFilter()
    const filteredVehicles = pipe.transform(vehicles, '20')
    expect(filteredVehicles.length).toBe(3)
    expect(filteredVehicles.pop()?.fabricationYear).toBe(2005)
  })
})
