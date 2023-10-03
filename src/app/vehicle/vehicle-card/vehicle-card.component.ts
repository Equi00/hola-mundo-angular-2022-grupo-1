import { Component, Input, OnInit } from '@angular/core'
import { Vehicle } from 'src/app/domain/vehicle/vehicle'

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css', '../vehicle.component.css']
})
export class VehicleCardComponent implements OnInit {
  @Input() vehicle!: Vehicle

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}
}
