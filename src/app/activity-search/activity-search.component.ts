import { ItineraryDay } from './../domain/itinerary/itineraryDay'
import { Itinerary } from './../domain/itinerary/itinerary'
import { ActivityService } from '../services/activity.service'
import { Component, OnInit } from '@angular/core'
import { Activity } from '../domain/activity/activity'
import { Difficulty } from '../domain/activity/difficulty'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { ItineraryService } from '../services/itinerary.service'

@Component({
  selector: 'app-activity-search',
  templateUrl: './activity-search.component.html',
  styleUrls: ['./activity-search.component.css']
})
export class ActivityComponent implements OnInit {
  activityToSearch = ''
  difficultyLow = Difficulty.LOW
  difficultyMedium = Difficulty.MEDIUM
  difficultyHigh = Difficulty.HIGH

  activitiesRecieved: Array<Activity> = []

  itinerary!: Itinerary | undefined
  itineraryDay!: ItineraryDay
  itineraryId = Number(this.route.snapshot.paramMap.get('id'))
  itineraryDayId = Number(this.route.snapshot.paramMap.get('day'))

  constructor(
    private activityService: ActivityService,
    private itineararyService: ItineraryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  thousandsSeparator(number: number) {
    const partsNumber = number.toString().split('.')
    partsNumber[0] = partsNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return partsNumber
  }

  ngOnInit() {
    this.activityService
      .getAll()
      .then((data: Array<Activity>) => {
        this.activitiesRecieved = data
        console.info('DATA RECIEVED: ', data)
      })
      .catch(() => {
        this.toastr.error('Error cargando las actividades', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-center-center'
        })
      })

    this.itineararyService.getOne(this.itineraryId).then((data) => {
      this.itinerary = data
    })
  }

  activitySelected(id: number): void {
    const activitySelected = this.activitiesRecieved.find((activity) => {
      return activity.id == id
    })
    console.info('DAY:', this.itineraryDayId - 1)
    this.itineararyService.itinearySelected!.days[
      this.itineraryDayId - 1
    ].addActivity(activitySelected!)
    // this.itinerary!.days[this.itineraryDayId - 1].addActivity(activitySelected!)
    this.router.navigate(['/itinerary', this.itineraryId, 'edit'])
  }

  makeSearch() {
    this.activityService
      .getAll(this.activityToSearch)
      .then((data) => {
        this.activitiesRecieved = data
      })
      .catch((error) => {
        this.toastr.error('Error buscando las actividades', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-center-center'
        })
      })
  }
}
