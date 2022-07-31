import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { PERMISSIONS } from 'src/app/constants/permissions';
import { USER_INFO, USER_PERMISSIONS } from 'src/app/constants/user';
import { configIcon } from '../../icons';
import { AuthService } from '../../services/auth.service';
import { hasPermission } from '../../utils/hasPermission';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnDestroy {
  @Input() options = [
    {
      text: 'Account',
      value: '/account',
      disabled: hasPermission(PERMISSIONS.VIEW_ACCOUNT) ? null : true,
      onClick: () => {},
    },
    {
      text: 'Logout',
      value: '/logout',
      onClick: () => this.onLogout(),
    },
  ];

  configIcon = configIcon;
  destroyed$ = new Subject();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.authService
      .logout()
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => {
          localStorage.removeItem(USER_INFO);
          localStorage.removeItem(USER_PERMISSIONS);
          this.router.navigate(['/welcome/login']);
        }),
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
