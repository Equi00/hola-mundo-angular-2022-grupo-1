import ActivityDTO from 'src/app/dto/activityDTO'
import { Activity } from './activity'

export default function activityFromJSON(activityDTO: ActivityDTO) {
  return Object.assign(new Activity(), activityDTO, {
    initialTime: new Date(activityDTO.initialTime),
    endTime: new Date(activityDTO.endTime)
  })
}
