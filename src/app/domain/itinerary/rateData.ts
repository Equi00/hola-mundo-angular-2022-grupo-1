import { User } from '../user/user'

export class RateData {
  constructor(
    public rateScore: number = 5,
    public userRate: User = new User()
    ) {}
    
    toJSON() {
      return {
        rateScore: this.rateScore,
        userRate: this.userRate.toJSON()
      }
    }
    toJSONAddScore() {
      return {
        rateScore: this.rateScore,
        idUserRate: this.userRate.id
      }
        

    }
}

