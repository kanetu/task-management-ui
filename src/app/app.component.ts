import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  router$: Observable<boolean | undefined> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((data: any) => {
      return ['/welcome/login', '/welcome/register'].includes(data.url);
    }),
  );

  ngOnInit(): void {}
}
