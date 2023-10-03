import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { REST_SERVER_URL } from 'src/configuration'
import { destinationFromJSON } from '../domain/destination/destinationFromJSON'
import DestinationDTO from '../dto/destinationDTO'

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private pathUrl: string = REST_SERVER_URL + '/api/destination/'

  constructor(private http: HttpClient) {}

  async getAll() {
    const destination$ = this.http.get<DestinationDTO[]>(this.pathUrl)
    const destination = await lastValueFrom(destination$)
    return destination.map((destinationDTO) =>
      destinationFromJSON(destinationDTO)
    )
  }
}
