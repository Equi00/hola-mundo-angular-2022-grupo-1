import {
  VehiclePreferenceDTO,
  VehiclePreferenceUniqueDTO
} from './../../dto/userDTO'
import {
  VehiclePreference,
  Neophyte,
  Superstitious,
  Capricious,
  Selective,
  NoLimit,
  Combined
} from './vehiclePreference'
import UserDTO from 'src/app/dto/userDTO'
import { User } from './user'
import { Difficulty } from '../activity/difficulty'
import {
  Personality,
  PersonalityRelaxed,
  PersonalityLocalist,
  PersonalityCautios,
  PersonalityDreamer,
  PersonalityActive,
  PersonalityExigent
} from './personality'
import { destinationFromJSON } from '../destination/destinationFromJSON'

export default function userFromJSON(userDTO: UserDTO): User {
  return Object.assign(new User(), userDTO, {
    personality: stringToPersonality(userDTO.personality.name),
    vehiclePreference: generateVehiclePreferenceFromDTO(
      userDTO.vehiclePreference
    ),
    desiredDestinations: userDTO.desiredDestinations.map((destination) =>
      destinationFromJSON(destination)
    ),
    visitedDestinations: userDTO.visitedDestinations.map((destination) =>
      destinationFromJSON(destination)
    ),
    friends: userDTO.friends.map((friend) => userFromJSON(friend))
  })
}

function stringToPersonality(personality: string): Personality {
  switch (personality) {
    case 'Localista': {
      return new PersonalityLocalist()
    }
    case 'Cauteloso': {
      return new PersonalityCautios()
    }
    case 'Soñador': {
      return new PersonalityDreamer()
    }
    case 'Activo': {
      return new PersonalityActive()
    }
    case 'Exigente': {
      return new PersonalityExigent(Difficulty.HIGH, 50)
    }
    default: {
      return new PersonalityRelaxed()
    }
  }
}

function generateVehiclePreferenceFromDTO(
  vehiclepreferenceDTO: VehiclePreferenceDTO
): any {
  switch (vehiclepreferenceDTO.name) {
    case 'Neophyte': {
      return new Neophyte()
      break
    }

    case 'Superstitious': {
      return new Superstitious()
      break
    }

    case 'Capricious': {
      return new Capricious()
      break
    }

    case 'Selective': {
      return new Selective('Honda')
      break
    }

    case 'NoLimit': {
      return new NoLimit()
      break
    }

    case 'Combined': {
      const combPrefs: Array<VehiclePreference> | undefined =
        vehiclepreferenceDTO.vehiclePreferences?.map((personality) =>
          generateVehiclePreferenceFromDTO({
            name: personality.name,
            specifiedBrand: personality.specifiedBrand,
            vehiclePreferences: []
          })
        )
      return new Combined(combPrefs ? combPrefs : [])
      break
    }
  }
}
