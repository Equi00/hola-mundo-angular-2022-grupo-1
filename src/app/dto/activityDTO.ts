import { Difficulty } from '../domain/activity/difficulty'

type ActivityDTO = {
  id?: number
  cost: number
  description: string
  initialTime: string
  endTime: string
  difficulty: string
}

export default ActivityDTO
