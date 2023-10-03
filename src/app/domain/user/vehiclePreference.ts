import {
  VehiclePreferenceDTO,
  VehiclePreferenceUniqueDTO
} from 'src/app/dto/userDTO'
import { Vehicle } from '../vehicle/vehicle'
import { User } from './user'

export interface VehiclePreference {
  name: string
  userLikes(user: User, vehicle: Vehicle): boolean
  toJson(): VehiclePreferenceDTO
}

export class Neophyte implements VehiclePreference {
  name = 'Neophyte'

  toJson(): VehiclePreferenceDTO {
    return { name: this.name, specifiedBrand: '', vehiclePreferences: [] }
  }

  userLikes(user: User, vehicle: Vehicle): boolean {
    return vehicle.antiquity() <= 2
  }
}

export class Superstitious implements VehiclePreference {
  name = 'Superstitious'

  toJson(): VehiclePreferenceDTO {
    return { name: this.name, specifiedBrand: '', vehiclePreferences: [] }
  }

  userLikes(user: User, vehicle: Vehicle): boolean {
    return vehicle.fabricationYear % 2 == 0
  }
}

export class Capricious implements VehiclePreference {
  name = 'Capricious'

  toJson(): VehiclePreferenceDTO {
    return { name: this.name, specifiedBrand: '', vehiclePreferences: [] }
  }

  userLikes(user: User, vehicle: Vehicle): boolean {
    return vehicle.brand[0] == vehicle.model[0]
  }
}

export class Selective implements VehiclePreference {
  name = 'Selective'

  constructor(public specifiedBrand: string) {}

  toJson(): VehiclePreferenceDTO {
    return {
      name: this.name,
      specifiedBrand: this.specifiedBrand,
      vehiclePreferences: []
    }
  }

  userLikes(user: User, vehicle: Vehicle): boolean {
    return vehicle.brand == this.specifiedBrand
  }
}

export class NoLimit implements VehiclePreference {
  name = 'NoLimit'

  toJson(): VehiclePreferenceDTO {
    return { name: this.name, specifiedBrand: '', vehiclePreferences: [] }
  }

  userLikes(user: User, vehicle: Vehicle): boolean {
    return vehicle.freeMilage
  }
}

export class Combined implements VehiclePreference {
  name = 'Combined'
  constructor(public vehiclePersonalities: Array<VehiclePreference>) {}

  toJson(): VehiclePreferenceDTO {
    return {
      name: this.name,
      specifiedBrand: '',
      vehiclePreferences: this.vehiclePersonalities.map((personality) => {
        return {
          name: personality.name,
          specifiedBrand: 'Honda'
        }
      })
    }
  }

  userLikes(user: User, vehicle: Vehicle): boolean {
    return this.vehiclePersonalities.every((personality) =>
      personality.userLikes(user, vehicle)
    )
  }
}
