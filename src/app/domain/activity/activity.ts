import { isBefore, differenceInMinutes } from 'date-fns'
import ActivityDTO from 'src/app/dto/activityDTO'
import { Difficulty } from './difficulty'

export class Activity {
  id!: number
  duration!: number
  constructor(
    public cost: number = 2000,
    public description: string = '',
    public initialTime: Date = new Date(),
    public endTime: Date = new Date(),
    public difficulty: Difficulty = Difficulty.HIGH
  ) {}

  toJSON(): ActivityDTO {
    return {
      id: this.id,
      cost: this.cost,
      description: this.description,
      initialTime: this.initialTime.toDateString(),
      endTime: this.endTime.toDateString(),
      difficulty: this.difficulty.name
    }
  }

  durationInMinutes(): number {
    return this.duration
  }

  isValid(): boolean {
    return this.hasDescription() && this.isTimeValid() && this.isCostValid()
  }

  hasDescription(): boolean {
    return this.description != ''
  }

  isTimeValid(): boolean {
    return isBefore(this.initialTime, this.endTime)
  }

  isCostValid(): boolean {
    return this.cost >= 0
  }
}
