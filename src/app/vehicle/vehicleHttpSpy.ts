import { of } from 'rxjs'
import { REST_SERVER_URL } from 'src/configuration'
import { Destination } from '../domain/destination/destination'
import { destinationStub, updatedUser, vehiclesStub } from './vehicle.stub'

export const vehicleHttpClientSpy = jasmine.createSpyObj('HttpClient', [
  'get',
  'delete',
  'post'
])

vehicleHttpClientSpy.get
  .withArgs(`${REST_SERVER_URL}/api/vehicle/search/`)
  .and.returnValue(of(vehiclesStub))

vehicleHttpClientSpy.get
  .withArgs(`${REST_SERVER_URL}/api/vehicle/search/honda`)
  .and.returnValue(
    of(vehiclesStub.filter((vehicle) => vehicle.brand === 'Honda'))
  )

vehicleHttpClientSpy.delete.and.returnValue(of(vehiclesStub[0]))

vehicleHttpClientSpy.get
  .withArgs(`${REST_SERVER_URL}/api/itinerary/0/destination`)
  .and.returnValue(of(destinationStub))

vehicleHttpClientSpy.get
  .withArgs(`${REST_SERVER_URL}/api/user/0/add-destination/0`)
  .and.returnValue(of(updatedUser))

vehicleHttpClientSpy.post.and.returnValue(of(updatedUser))
