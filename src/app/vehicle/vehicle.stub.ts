import { Destination } from '../domain/destination/destination'
import { User } from '../domain/user/user'
import { Car } from '../domain/vehicle/car'
import { Motocicle } from '../domain/vehicle/motocicle'
import { Truck } from '../domain/vehicle/Truck'

export const principalVehicle = new Car('Honda', 'A11', 2001, 500, true, true)
principalVehicle.id = 1
const anotherVehicles = [
  new Truck('Scania', 'B106', 1998, 201, true, false),
  new Motocicle('Yamaha', 'BB422', 2010, 1500, true, 10)
]
anotherVehicles[0].id = 2
anotherVehicles[1].id = 3

export const vehiclesStub = [
  principalVehicle,
  anotherVehicles[0],
  anotherVehicles[1]
].map((vehicle) => vehicle.toJSON())

export const updatedUser = new User(
  'Nicolas',
  'Villamonte',
  'nicovillamonte',
  new Date(),
  'Argentina'
)
updatedUser.visitedDestinations.push(
  new Destination('Brasil', 'Sao Pablo', 2000)
)

export const destinationStub = new Destination(
  'Argentina',
  'Buenos Aires',
  2000
)
destinationStub.id = 0
