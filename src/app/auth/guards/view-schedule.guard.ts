import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PERMISSIONS } from 'src/app/constants/permissions';

@Injectable({
  providedIn: 'root',
})
export class ViewScheduleGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (route.data['permissions'].includes(PERMISSIONS.VIEW_SCHEDULE)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
