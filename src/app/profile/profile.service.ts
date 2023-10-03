import {
  VehiclePreference,
  Neophyte,
  Superstitious,
  Capricious,
  Selective,
  NoLimit,
  Combined
} from '../domain/user/vehiclePreference'
import { Injectable } from '@angular/core'
import { User } from '../domain/user/user'
import { Destination } from '../domain/destination/destination'
import { REST_SERVER_URL } from 'src/configuration'
import { AuthService } from '../services/auth.service'
import { HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'
import UserDTO from '../dto/userDTO'
import userFromJSON from '../domain/user/userFromJSON'
import {
  Personality,
  PersonalityRelaxed,
  PersonalityLocalist,
  PersonalityCautios,
  PersonalityDreamer,
  PersonalityActive,
  PersonalityExigent
} from '../domain/user/personality'
import { Difficulty } from '../domain/activity/difficulty'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user: User = new User('', '', '', new Date(), '')

  constructor(private http: HttpClient) {}

  async getUserData(id: number) {
    const userDTO$ = this.http.get<UserDTO>(REST_SERVER_URL + '/api/user/' + id)

    const userDTO = await lastValueFrom(userDTO$)

    return userDTO ? userFromJSON(userDTO) : undefined
  }

  sendData(user: User) {
    if (user.id == undefined) {
      throw Error('El id del usuario no puede ser null')
    }
    return this.http.put<UserDTO>(
      REST_SERVER_URL + `/api/user/${user.id}`,
      user.toJSON()
    )
  }
}
