import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { REST_SERVER_URL } from 'src/configuration'
import { Activity } from '../domain/activity/activity'
import activityFromJSON from '../domain/activity/activityFromJson'
import ActivityDTO from '../dto/activityDTO'

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  activities: Activity[] = []
  private pathUrl: string = REST_SERVER_URL + '/api/activity'

  constructor(private http: HttpClient) {}

  async getAll(toSearch = '') {
    console.info('PATH: ', this.pathUrl + '/search/' + toSearch)
    const activities$ = this.http.get<ActivityDTO[]>(
      this.pathUrl + '/search/' + toSearch
    )
    const activities = await lastValueFrom(activities$)
    return activities.map((activityDTO) => activityFromJSON(activityDTO))
  }

  async getById(id: number) {
    const activityDTO$ = this.http.get<ActivityDTO>(
      REST_SERVER_URL + this.pathUrl + id
    )
    const activityDTO = await lastValueFrom(activityDTO$)
    return activityDTO ? activityFromJSON(activityDTO) : undefined
  }
}
