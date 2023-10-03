import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { ItineraryService } from '../services/itinerary.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginUsernameText = ''
  public loginPasswordText = ''
  public errorLogingIn = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private itineraryService: ItineraryService
  ) {}

  async ngOnInit() {
    this.errorLogingIn = false
    if (await this.isLogedIn()) {
      this.authService.logOutUser()
    }
    this.itineraryService.deselect()
  }

  login() {
    this.authService
      .logInUser(this.loginUsernameText, this.loginPasswordText)
      .then((authRes) => {
        if (authRes) {
          this.errorLogingIn = false
          this.router.navigate(['/main'])
        } else {
          this.errorLogingIn = true
        }
      })
  }

  async isLogedIn() {
    const user = await this.authService.getLogedUser()
    console.info(user)
    return user != null
  }

  inputChanged() {
    this.errorLogingIn = false
  }
}
