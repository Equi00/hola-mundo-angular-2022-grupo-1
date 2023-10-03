import { Itinerary } from '../itinerary/itinerary'
import { User } from './user'
import { Difficulty } from '../activity/difficulty'
import { PersonalityDTO } from 'src/app/dto/userDTO'

export interface Personality {
  name: string
  canDoItinerary(user: User, itinerary: Itinerary): boolean
  toJSON(): PersonalityDTO
}

export class PersonalityRelaxed implements Personality {
  name = "Relajado"

  toJSON(): PersonalityDTO {
    return { name: this.name,
      difficulty: Difficulty.LOW.toJSON()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canDoItinerary(user: User, itinerary: Itinerary): boolean {
    return true
  }
}

export class PersonalityLocalist implements Personality {
  name = "Localista"

  toJSON(): PersonalityDTO {
    return { name: this.name,
      difficulty: Difficulty.LOW.toJSON()
    }
  }

  canDoItinerary(user: User, itinerary: Itinerary): boolean {
    return itinerary.destination.isLocal()
  }
}

export class PersonalityCautios implements Personality {
  name = "Cauteloso"

  toJSON(): PersonalityDTO {
    return { name: this.name,
      difficulty: Difficulty.LOW.toJSON()
    }
  }

  canDoItinerary(user: User, itinerary: Itinerary): boolean {
    return (
      this.knowDestination(user, itinerary) ||
      this.someFriendKnowDestination(user, itinerary)
    )
  }

  private knowDestination(user: User, itinerary: Itinerary): boolean {
    return user.knowDestination(itinerary.destination)
  }

  private someFriendKnowDestination(user: User, itinerary: Itinerary): boolean {
    return user.friends.some((friend) =>
      friend.knowDestination(itinerary.destination)
    )
  }
}

export class PersonalityDreamer implements Personality {
  name = "Soñador"

  toJSON(): PersonalityDTO {
    return {  name: this.name, 
              difficulty: Difficulty.LOW.toJSON()
            }
  }

  canDoItinerary(user: User, itinerary: Itinerary): boolean {
    return (
      user.isDesiredDestination(itinerary.destination) ||
      this.isMoreExpensive(user, itinerary)
    )
  }

  private maxCostDesiredDestination(user: User): number {
    const maximumValue = user.desiredDestinations
      .map((destination) => destination.totalCostFor(user))
      .sort((n1, n2) => n2 - n1)[0]
    const cost = user.desiredDestinations
      .find((destination) => destination.totalCostFor(user) == maximumValue)
      ?.totalCostFor(user)
    return cost ? cost : 0
  }

  private isMoreExpensive(user: User, itinerary: Itinerary): boolean {
    return (
      itinerary.destination.totalCostFor(user) >
      this.maxCostDesiredDestination(user)
    )
  }
}

export class PersonalityActive implements Personality {
  name = "Activo"

  toJSON(): PersonalityDTO {
    return { name: this.name,
              difficulty: Difficulty.LOW.toJSON()

    }
  }

  canDoItinerary(user: User, itinerary: Itinerary): boolean {
    return itinerary.isAlmostOneActivityPerDay()
  }
}

export class PersonalityExigent implements Personality {
  name = "Exigente"

  toJSON(): PersonalityDTO {
    return { name: this.name, difficulty: this.difficulty.toJSON() }
  }

  constructor(public difficulty: Difficulty, public percentage: number) {}

  canDoItinerary(user: User, itinerary: Itinerary): boolean {
    return this.percentageDifficulty(itinerary) >= this.percentage
  }

  private countDifficultyActivities(itinerary: Itinerary): number {
    return itinerary
      .getAllActivitiesAsList()
      .filter((activity) => activity.difficulty == this.difficulty).length
  }

  private percentageDifficulty(itinerary: Itinerary): number {
    return (
      (this.countDifficultyActivities(itinerary) * 100) /
      itinerary.totalActivities()
    )
  }
}
