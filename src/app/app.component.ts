import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators'
import { Location } from '@angular/common'
import { Observer } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hola-mundo-angular-2022-grupo-1'
  public currentRoute = '/'

  constructor(private router: Router) {
    console.log(router.url)

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const nav = event as NavigationEnd
        nav.url == '/'
          ? (this.currentRoute = '/login')
          : (this.currentRoute = nav.url)
      })
  }
}
