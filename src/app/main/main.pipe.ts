import { Pipe, PipeTransform } from '@angular/core'
import { Itinerary } from '../domain/itinerary/itinerary'

@Pipe({ name: 'itineraryFilter' })
export class ItineraryFilter implements PipeTransform {
  transform(itineraries: Itinerary[], searchValue: string): Itinerary[] {
    return itineraries.filter(
      (itinerary) =>
        !searchValue ||
        this.coincide(itinerary.country(), searchValue) ||
        this.coincide(itinerary.city(), searchValue)
    )
  }

  coincide(value1: string, value2: string) {
    return value1.toLowerCase().match(value2.toLowerCase())
  }
}
