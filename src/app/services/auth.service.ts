import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { User } from 'src/app/domain/user/user'
import { REST_SERVER_URL } from 'src/configuration'
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLogedIn!: User | null
  private pathUrl: string = REST_SERVER_URL + '/api/auth/'

  constructor(private userService: UserService, private http: HttpClient) {}

  async logInUser(username: string, password: string): Promise<boolean> {
    const authenticationResponse$ = this.http.get<boolean>(
      this.pathUrl + username + '/' + password
    )
    const authenticationResponse = await lastValueFrom(authenticationResponse$)
    return authenticationResponse
      ? this.changeLogedUser(await this.userService.getByUserName(username))
      : authenticationResponse
  }

  changeLogedUser(user: User) {
    this.userLogedIn = user
    return true
  }

  getLogedUser() {
    return this.userLogedIn!
  }

  logOutUser() {
    this.userLogedIn = null
  }
}
