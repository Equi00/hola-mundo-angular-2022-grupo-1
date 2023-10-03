import { Activity } from '../activity/activity'

export class ItineraryDay {
  activities: Array<Activity> = []

  toJSON() {
    return {
      activities: this.activities.map((activity) => activity.toJSON())
    }
  }

  totalActivitiesCost(): number {
    return this.activities.reduce((total, activity) => total + activity.cost, 0)
  }

  averageDuration(): number {
    return (
      this.activities.reduce(
        (totalDuration, activity) => totalDuration + activity.duration,
        0
      ) / this.activities.length
    )
  }

  isAlmostOneActivity(): boolean {
    return this.activities.length != 0
  }

  areOverlapedActivities(): boolean {
    return this.activities.some((act1) =>
      this.activities.some(
        (act2) =>
          act1.initialTime < act2.endTime &&
          act1.endTime > act2.initialTime &&
          act1 !== act2
      )
    )
  }

  addActivity(activity: Activity) {
    this.activities.push(activity)
  }

  addActivities(_activities: Array<Activity>) {
    this.activities = this.activities.concat(_activities)
  }

  removeActivity(activity: Activity) {
    const index = this.activities.indexOf(activity)
    this.activities.splice(index, 1)
  }

  removeActivities(_activities: Array<Activity>) {
    for (const activity of _activities)
      this.activities.splice(this.activities.indexOf(activity), 1)
  }
}
