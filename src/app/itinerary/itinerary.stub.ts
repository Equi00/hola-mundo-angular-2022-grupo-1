import { Itinerary } from '../domain/itinerary/itinerary'
import { ItineraryDay } from '../domain/itinerary/itineraryDay'
import { Rate } from '../domain/itinerary/rate'
import { RateData } from '../domain/itinerary/rateData'
import { User } from '../domain/user/user'
import userStub from '../domain/user/user.stub'
import vehicleFromJSON from '../domain/vehicle/vehicleFromJson'
import { destinationStub, vehiclesStub } from '../vehicle/vehicle.stub'

const itineraryStub = new Itinerary(userStub, destinationStub)
itineraryStub.id = 0

itineraryStub.days = [
  new ItineraryDay(),
  new ItineraryDay(),
  new ItineraryDay()
]

itineraryStub.rate = new Rate()

itineraryStub.rate.rateInfo = [
  new RateData(10, new User()),
  new RateData(5, new User())
]

itineraryStub.vehicle = vehicleFromJSON(vehiclesStub[0])

export default itineraryStub
