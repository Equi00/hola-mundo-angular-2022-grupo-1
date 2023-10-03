import { Activity } from './../domain/activity/activity'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'activityFilter'
})
export class ActivityFilter implements PipeTransform {

  transform(activities: Activity[], toSearch: string): any {
    return activities.filter(activity => !toSearch || 
      activity.description.toLowerCase().match(toSearch.toLowerCase()))
  }

}
