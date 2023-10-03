import { of } from 'rxjs'
import { REST_SERVER_URL } from 'src/configuration'
import { activitiesStub } from './activity.stub'

export const activityHttpClientSpy = jasmine.createSpyObj(
  'ActivityHttpClient',
  ['get', 'delete']
)

activityHttpClientSpy.get
  .withArgs(`${REST_SERVER_URL}/api/activity/search/`)
  .and.returnValue(of(activitiesStub))

activityHttpClientSpy.get
  .withArgs(`${REST_SERVER_URL}/api/activity/search/SENDE`)
  .and.returnValue(
    of(
      activitiesStub.filter(
        (activity) =>
          activity.description == 'Senderismo / Trekking en Cerro Campanario'
      )
    )
  )

activityHttpClientSpy.get
  .withArgs(`${REST_SERVER_URL}/api/activity/search/3453453455`)
  .and.returnValue(
    of(
      activitiesStub.filter((activity) => activity.description == '3453453455')
    )
  )

activityHttpClientSpy.delete.and.returnValue(of(activitiesStub[0]))
