import { User } from '../user/user'
import { RateData } from './rateData'

export class Rate {
  rateInfo: Array<RateData> = []

  toJSON() {
    return {
      rateInfo: this.rateInfo.map((ri) => ri.toJSON())
    }
  }

  hadUserRated(user: User): boolean {
    return this.rateInfo.some((ri) => ri.userRate.id == user.id)
  }

  addRate(score: number, user: User) {
    this.rateInfo.push(new RateData(score, user))
  }

  isMultipleRatesByOneUser(): boolean {
    return (
      this.nonRepeatedUsers(this.getUserThatRatedIn(this.rateInfo)).length !=
      this.getUserThatRatedIn(this.rateInfo).length
    )
  }

  private getUserThatRatedIn(arr: Array<RateData>): Array<User> {
    return arr.map((ri) => ri.userRate)
  }

  private nonRepeatedUsers(arr: Array<User>): Array<User> {
    return arr.filter((item, index) => {
      return arr.indexOf(item) === index
    })
  }

  isValid(): boolean {
    return !this.rateInfo.some((ri) => ri.rateScore < 1 || ri.rateScore > 10)
  }
}
