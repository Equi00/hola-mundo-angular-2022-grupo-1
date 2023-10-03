import { Injectable } from '@angular/core'
import { Car } from '../domain/vehicle/car'
import { Motocicle } from '../domain/vehicle/motocicle'
import { Truck } from '../domain/vehicle/Truck'
import { Vehicle } from '../domain/vehicle/vehicle'
import { HttpClient } from '@angular/common/http'
import { REST_SERVER_URL } from 'src/configuration'
import { lastValueFrom } from 'rxjs'
import VehicleDTO from '../dto/vehicleDTO'
import vehicleFromJson from '../domain/vehicle/vehicleFromJson'

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehicles: Vehicle[]
  private pathUrl: string = REST_SERVER_URL + '/api/vehicle/'

  constructor(private http: HttpClient) {
    this.vehicles = [
      new Car('Honda', 'A11', 2001, 500, true, true),
      new Motocicle('Lamborgini', 'BB422', 2010, 1500, true, 10),
      new Truck('Rubi', 'hfhfsa', 1998, 201, true, false),
      new Car('Audi', 'A10', 2005, 500, true, true),
      new Motocicle('Romero', 'BA637', 2010, 456, true, 50),
      new Truck('Rubi', 'rocket', 1998, 400, true, false),
      new Car('Toyota', 'model', 1999, 500, true, true),
      new Motocicle('Kentucky', 'BA598', 2010, 1600, true, 90),
      new Truck('Rubi', 'B45', 1998, 890, true, false)
    ]
    this.setIds()
  }

  getAllMocked(): Promise<Array<Vehicle>> {
    return new Promise((res) => {
      res(this.vehicles)
    })
  }

  private setIds() {
    this.vehicles.forEach((vehicle, index) => {
      vehicle.id = index
    })
  }

  async getAll(toSearch = '') {
    const vehicles$ = this.http.get<VehicleDTO[]>(
      this.pathUrl + 'search/' + toSearch
    )
    const vehicles = await lastValueFrom(vehicles$)
    return vehicles.map((vehicleDTO) => vehicleFromJson(vehicleDTO))
  }

  async getById(id: number) {
    const vehicleDTO$ = this.http.get<VehicleDTO>(this.pathUrl + id)
    const vehicleDTO = await lastValueFrom(vehicleDTO$)
    return vehicleDTO ? vehicleFromJson(vehicleDTO) : undefined
  }
}
