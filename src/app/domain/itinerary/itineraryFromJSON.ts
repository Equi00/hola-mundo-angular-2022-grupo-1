import ItineraryDTO, {
  ItineraryDayDTO,
  RateDataDTO,
  RateDTO
} from 'src/app/dto/itineraryDTO'
import activityFromJSON from '../activity/activityFromJson'
import { destinationFromJSON } from '../destination/destinationFromJSON'
import userFromJSON from '../user/userFromJSON'
import vehicleFromJSON from '../vehicle/vehicleFromJson'
import { Itinerary } from './itinerary'
import { ItineraryDay } from './itineraryDay'
import { Rate } from './rate'
import { RateData } from './rateData'

export default function itineraryFromJSON(
  itineraryDTO: ItineraryDTO
): Itinerary {
  return Object.assign(new Itinerary(), itineraryDTO, {
    creator: userFromJSON(itineraryDTO.creator),
    destination: destinationFromJSON(itineraryDTO.destination),
    days: itineraryDTO.days.map((day) => itineraryDayFromJSON(day)),
    vehicle: vehicleFromJSON(itineraryDTO.vehicle),
    rate: rateFromJson(itineraryDTO.rate)
  })
}

export function itineraryDayFromJSON(itineraryDayDTO: ItineraryDayDTO) {
  return Object.assign(new ItineraryDay(), itineraryDayDTO, {
    activities: itineraryDayDTO.activities.map((activityDTO) =>
      activityFromJSON(activityDTO)
    )
  })
}

export function rateFromJson(rateDTO: RateDTO) {
  return Object.assign(new Rate(), rateDTO, {
    rateInfo: rateDTO.rateInfo.map((rateDataDTO) =>
      rateDataDTOFromJSON(rateDataDTO)
    )
  })
}

export function rateDataDTOFromJSON(rateDataDTO: RateDataDTO) {
  return Object.assign(new RateData(), rateDataDTO, {
    userRate: userFromJSON(rateDataDTO.userRate)
  })
}

