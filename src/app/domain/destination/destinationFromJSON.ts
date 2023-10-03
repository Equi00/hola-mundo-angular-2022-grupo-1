import { Destination } from './../destination/destination'
import { DestinationDTO } from '../../dto/destinationDTO'

export function destinationFromJSON(
  destinationDTO: DestinationDTO
): Destination {
  return Object.assign(new Destination(), destinationDTO, {
    id: destinationDTO.id
  })
}
