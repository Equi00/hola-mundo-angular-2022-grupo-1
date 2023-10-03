import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { REST_SERVER_URL } from 'src/configuration'
import { User } from '../domain/user/user'
import userFromJSON from '../domain/user/userFromJSON'
import UserDTO from '../dto/userDTO'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private pathUrl: string = REST_SERVER_URL + '/api/user/'

  constructor(private http: HttpClient) {}

  async getAll() {
    const user$ = this.http.get<UserDTO[]>(this.pathUrl)
    const user = await lastValueFrom(user$)
    return user.map((itineraryDTO) => userFromJSON(itineraryDTO))
  }

  async getOne(id: number) {
    const user$ = this.http.get<UserDTO>(this.pathUrl + id)
    const user = await lastValueFrom(user$)
    return user ? userFromJSON(user) : new User()
  }

  async getByUserName(username: string): Promise<User> {
    const user$ = this.http.get<UserDTO>(this.pathUrl + 'username/' + username)
    const user = await lastValueFrom(user$)
    return user ? userFromJSON(user) : new User()
  }

  async addVisitedDestination(userId: number, destinationId: number) {
    console.info('userID: ' + userId + ' destinationId: ' + destinationId)
    const user$ = this.http.post<UserDTO>(
      this.pathUrl + userId + '/add-destination/' + destinationId,
      {}
    )
    const user = await lastValueFrom(user$)
    return user ? userFromJSON(user) : false
  }
}
