import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Destination } from '../domain/destination/destination'
import { User } from '../domain/user/user'
import { Vehicle } from '../domain/vehicle/vehicle'
import { AuthService } from '../services/auth.service'
import { ItineraryService } from '../services/itinerary.service'
import { UserService } from '../services/user.service'
import { VehicleService } from '../services/vehicle.service'

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicleToSearch = ''
  itineraryId = Number(this.route.snapshot.paramMap.get('id'))
  vehicleIdSelected!: number | null
  buttonsEnabled = true
  notVehicleText = 'Cargando...' // 'No se encuentra ningun vehiculo'
  user!: User

  vehiclesRecieved: Array<Vehicle> = []

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private itineraryService: ItineraryService
  ) {}

  verifyUserIsLogedIn() {
    this.user = this.authService.getLogedUser()
    if (!this.user) this.router.navigate(['/login'])
  }

  ngOnInit() {
    this.verifyUserIsLogedIn()

    this.vehicleService
      .getAll()
      .then((data: Array<Vehicle>) => {
        this.vehiclesRecieved = data
        this.notVehicleText = 'No se encuentra ningun vehiculo'
      })
      .catch(() => {
        this.toastr.error('Error cargando los vehiculos', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-center-center'
        })
        this.notVehicleText = 'Error en el servidor (Error 503)'
      })
  }

  async finish() {
    this.buttonsEnabled = false
    let dest, res

    try {
      dest = await this.itineraryService.getDestination(this.itineraryId)
      res = await this.userService.addVisitedDestination(this.user.id, dest.id)
    } catch (e) {
      console.error(e)
    }

    if (res) {
      this.toastr.success(
        'El itinerario se ha configuro correctamente',
        'Felicitaciones!',
        {
          timeOut: 2000,
          positionClass: 'toast-center-center'
        }
      )

      setTimeout(() => {
        this.router.navigate(['/main'])
      }, 2000)
    } else {
      this.toastr.error('Error al configurar el itinerario', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-center-center'
      })
      this.buttonsEnabled = true
    }
  }

  goBack(): void {
    this.router.navigate(['/itinerary', this.itineraryId, 'view'])
  }

  select(id: number) {
    this.vehicleIdSelected === id
      ? (this.vehicleIdSelected = null)
      : (this.vehicleIdSelected = id)
  }

  makeSearch() {
    this.vehicleService
      .getAll(this.vehicleToSearch)
      .then((data) => {
        this.vehiclesRecieved = data
        this.notVehicleText = 'No se encuentra ningun vehiculo'
      })
      .catch(() => {
        this.toastr.error('Error buscando los vehiculos', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-center-center'
        })
        this.notVehicleText = 'Error en el servidor (Error 503)'
      })
  }
}
