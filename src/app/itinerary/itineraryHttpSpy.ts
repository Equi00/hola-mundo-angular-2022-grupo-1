import { of } from 'rxjs'
import itineraryStub from './itinerary.stub'

export const itineraryHttpClientSpy = jasmine.createSpyObj(
  'ItineraryHttpClient',
  ['get', 'delete']
)

itineraryHttpClientSpy.get.and.returnValue(of(itineraryStub))
