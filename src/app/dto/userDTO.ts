import destinationDTO from './destinationDTO'
import ItineraryDTO from './itineraryDTO'

type UserDTO = {
  id: number
  name: string
  surname: string
  userName: string
  initialDate: Date
  countryOfResidence: string
  friends: Array<UserDTO>
  desiredDestinations: Array<destinationDTO>
  travelDays: number
  visitedDestinations: Array<destinationDTO>
  vehiclePreference: VehiclePreferenceDTO
  personality: PersonalityDTO
  email: string
  itineraries: Array<ItineraryDTO>
  itinerariesToRate: Array<ItineraryDTO>
  antiquity: number
}

export type VehiclePreferenceUniqueDTO = {
  name: string
  specifiedBrand?: string
}

export type VehiclePreferenceDTO = {
  name: string
  specifiedBrand?: string
  vehiclePreferences?: Array<VehiclePreferenceUniqueDTO>
}

export type PersonalityDTO = {
  name: string
  difficulty?: DifficultyDTO
}

export type DifficultyDTO = {
  name: string
  priority: number
}

export default UserDTO
