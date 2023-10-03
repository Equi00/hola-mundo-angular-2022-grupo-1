import { Pipe, PipeTransform } from '@angular/core'
import { Itinerary } from '../domain/itinerary/itinerary'
import { User } from '../domain/user/user'

@Pipe({
  name: 'myItineraryFilter'
})
export class MyItineraryPipe implements PipeTransform {
  transform(itineraries: Itinerary[], user: User): Itinerary[] {
    return itineraries.filter((itinerary) => itinerary.creator.id == user.id)
  }
}
