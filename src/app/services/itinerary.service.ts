import { AddRateDTO, RateDataDTO } from './../dto/itineraryDTO'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { REST_SERVER_URL } from 'src/configuration'
import { Destination } from '../domain/destination/destination'
import { destinationFromJSON } from '../domain/destination/destinationFromJSON'
import { Itinerary } from '../domain/itinerary/itinerary'
import itineraryFromJSON from '../domain/itinerary/itineraryFromJSON'
import { Vehicle } from '../domain/vehicle/vehicle'
import DestinationDTO from '../dto/destinationDTO'
import { ItineraryDTO, ItineraryUpdateDTO } from '../dto/itineraryDTO'
import { RateData } from '../domain/itinerary/rateData'

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  itinearySelected!: Itinerary | undefined
  private pathUrl: string = REST_SERVER_URL + '/api/itinerary/'

  constructor(private http: HttpClient) {}

  select(itinerary: Itinerary) {
    this.itinearySelected = itinerary
  }

  deselect() {
    this.itinearySelected = undefined
  }

  async getAll(toSearch = '') {
    const itinerary$ = this.http.get<ItineraryDTO[]>(
      this.pathUrl + 'search/' + toSearch
    )
    const itinerary = await lastValueFrom(itinerary$)
    return itinerary.map((itineraryDTO) => itineraryFromJSON(itineraryDTO))
  }

  async getOne(id: number) {
    const itinerary$ = this.http.get<ItineraryDTO>(this.pathUrl + id)
    const itinerary = await lastValueFrom(itinerary$)
    return itinerary ? itineraryFromJSON(itinerary) : new Itinerary()
  }

  async getDestination(itineraryId: number): Promise<Destination> {
    const destination$ = this.http.get<DestinationDTO>(
      this.pathUrl + itineraryId + '/destination'
    )
    const destination = await lastValueFrom(destination$)
    return destination ? destinationFromJSON(destination) : new Destination()
  }

  addScore(score: number, itinerary: Itinerary, userId: number) {
    if (itinerary.id == undefined) {
      throw Error('El id del itinerary no puede ser null')
    }
    const rate: AddRateDTO = {
      rateScore: score,
      idUserRate: userId
    }
    return this.http.put<AddRateDTO>(this.pathUrl + itinerary.id + 'rate', rate)
  }

  update(itinerary: Itinerary) {
    if (itinerary.id == undefined) {
      throw Error('El id del itinerary no puede ser null')
    }
    return this.http.put<ItineraryUpdateDTO>(
      this.pathUrl + itinerary.id,
      itinerary.toUpdateJSON()
    )
  }
}
