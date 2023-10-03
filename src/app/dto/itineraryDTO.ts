import ActivityDTO from './activityDTO'
import DestinationDTO from './destinationDTO'
import UserDTO from './userDTO'
import VehicleDTO from './vehicleDTO'

export type ItineraryDTO = {
  id: number
  creator: UserDTO
  destination: DestinationDTO
  days: Array<ItineraryDayDTO>
  rate: RateDTO
  vehicle: VehicleDTO
}

export type ItineraryUpdateDTO = {
  id: number
  destination: DestinationDTO
  days: Array<ItineraryDayDTO>

}

export type ItineraryDayDTO = {
  id?: number
  activities: Array<ActivityDTO>
}

export type RateDTO = {
  rateInfo: Array<RateDataDTO>
}

export type RateDataDTO = {
  rateScore: number
  userRate: UserDTO
}

export type AddRateDTO = {
  rateScore: number
  idUserRate: number
}

export default ItineraryDTO
