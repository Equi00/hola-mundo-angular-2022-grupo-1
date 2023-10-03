import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { ProfileService } from './profile.service'
import { Destination } from '../domain/destination/destination'
import {
  VehiclePreference,
  Neophyte,
  Superstitious,
  Capricious,
  Selective,
  NoLimit,
  Combined
} from '../domain/user/vehiclePreference'
import { User } from '../domain/user/user'
import {
  PersonalityRelaxed,
  PersonalityLocalist,
  PersonalityCautios,
  PersonalityDreamer,
  PersonalityActive,
  PersonalityExigent
} from '../domain/user/personality'
import { Difficulty } from '../domain/activity/difficulty'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../services/auth.service'
import { UserService } from '../services/user.service'
import { ItineraryService } from '../services/itinerary.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // user!: User
  user: User = new User('', '', '', new Date(), '')
  userPersonality!: string
  residenceCountries: Array<string> = ['Uruguay', 'Argentina', 'Islandia']
  personalities: Array<string> = [
    'Relajado',
    'Localista',
    'Cauteloso',
    'Soñador',
    'Activo',
    'Exigente'
  ]
  possibleFriends!: User[]
  possibleFriendSelected!: User
  vehiclePreferences: Array<string> = []
  profileId!: number

  isSelected = false
  Neophyte = false
  Superstitious = false
  Capricious = false
  Selective = false
  NoLimit = false
  Combined = false

  unamePattern = '^[a-zA-Z. ]*[a-zA-Z]{1,20}$'
  snamePattern = '^[a-zA-Z. ]*[a-zA-Z]{1,30}$'
  nnamePattern = '^[a-z0-9]{1,15}$'
  adaysPattern = '^[0-9]{0,3}$'

  //Mock data
  mockDesiredDestination: Destination = new Destination(
    'Argentina',
    'Mar de las Pampas',
    0
  )
  //End Mock Data

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private itineraryService: ItineraryService
  ) {}

  async ngOnInit() {
    this.verifyUserIsLogedIn()
    this.itineraryService.deselect()

    this.profileId = this.user.id
    this.initialize()
    this.possibleFriends = await (
      await this.userService.getAll()
    ).filter((user) => user.id != this.user.id)
  }

  verifyUserIsLogedIn() {
    this.user = this.authService.getLogedUser()
    if (!this.user) this.router.navigate(['/login'])
  }

  async initialize() {
    const _user = await this.profileService.getUserData(this.profileId)

    if (_user) {
      this.user = _user
      this.userPersonality = _user.personality.name
      this.generateVehiclePreferenceStrings()
    }
  }

  async generateVehiclePreferenceStrings() {
    this.user
      .convertVehiclePreferenceToString()
      .forEach((preference) => this.checkSelected(preference))
  }

  addNewFriend(friend: User) {
    this.user.addFriend(friend)
    this.possibleFriends.splice(this.possibleFriends.indexOf(friend), 1)
  }

  saveChanges() {
    this.generateVehiclePreference()
    this.changePersonality(this.userPersonality)

    console.info('USUARIO: ', this.user.toJSON())

    this.profileService.sendData(this.user).subscribe({
      next: () => {
        this.doneProfileEdit()
      },
      error: (error: Error) => {
        this.toastr.error('Error cargando el Perfil', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-center-center'
        })
      }
    })
  }

  doneProfileEdit() {
    this.router.navigate(['/main'])
  }

  cancelProfileEdit() {
    this.router.navigate(['/main'])
  }

  generateVehiclePreference() {
    let newPreference: VehiclePreference
    if (this.vehiclePreferences.length == 0) newPreference = new Neophyte()
    if (this.vehiclePreferences.length == 1)
      newPreference = this.stringToClassPreference(this.vehiclePreferences[0])
    else {
      const prefs: Array<VehiclePreference> = this.vehiclePreferences.map(
        (pref) => this.stringToClassPreference(pref)
      )
      newPreference = new Combined(prefs)
    }
    this.user.changeVehiclePreference(newPreference)
  }

  stringToClassPreference(pref: string): VehiclePreference {
    let vechiclePreferenceObjects: Array<VehiclePreference> = [
      new Neophyte(),
      new Superstitious(),
      new Capricious(),
      new Selective('Honda'),
      new NoLimit()
    ]
    let prefSelec = vechiclePreferenceObjects.find(
      (_class) => _class.name == pref
    )!
    return prefSelec
  }

  changePersonality(personality: string) {
    let personalitiesObjects = [
      new PersonalityRelaxed(),
      new PersonalityLocalist(),
      new PersonalityCautios(),
      new PersonalityDreamer(),
      new PersonalityActive(),
      new PersonalityExigent(Difficulty.HIGH, 50)
    ]
    this.user.changePersonality(
      personalitiesObjects.find(
        (_personality) => _personality.name == personality
      )!
    )
  }

  checkSelected(vehiclePreference: string) {
    switch (vehiclePreference) {
      case 'Neophyte': {
        this.Neophyte = !this.Neophyte
        this.isSelected = this.Neophyte
        break
      }
      case 'Superstitious': {
        this.Superstitious = !this.Superstitious
        this.isSelected = this.Superstitious
        break
      }
      case 'Capricious': {
        this.Capricious = !this.Capricious
        this.isSelected = this.Capricious
        break
      }
      case 'Selective': {
        this.Selective = !this.Selective
        this.isSelected = this.Selective
        break
      }
      case 'NoLimit': {
        this.NoLimit = !this.NoLimit
        this.isSelected = this.NoLimit
        break
      }
      case 'Combined': {
        this.Combined = !this.Combined
        this.isSelected = this.Combined
        break
      }
    }
    if (this.isSelected) this.addVehiclePreference(vehiclePreference)
    else this.removeVehiclePreference(vehiclePreference)
    if (this.vehiclePreferences.length > 1) this.Combined = true
    else this.Combined = false
  }

  isInArray(personality: string): boolean {
    return this.vehiclePreferences.includes(personality)
  }

  addVehiclePreference(personality: string) {
    this.vehiclePreferences.push(personality)
  }

  removeVehiclePreference(personality: string) {
    this.vehiclePreferences.splice(
      this.vehiclePreferences.indexOf(personality),
      1
    )
  }
}
