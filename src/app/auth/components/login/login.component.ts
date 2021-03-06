import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { USER_INFO, USER_PERMISSIONS } from 'src/app/constants/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  loading = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  loginForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  handleLogin(): void {
    this.authService
      .login(this.loginForm.value)
      .pipe(
        takeUntil(this.destroyed$),
        tap(({ data, status }) => {
          const permissions = data.role.permissions
            .filter((item) => item.active)
            .map((item) => item.title);
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          localStorage.setItem(USER_PERMISSIONS, JSON.stringify(permissions));
          localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
          if (status) {
            this.router.navigate(['/']);
          }
        }),
      )
      .subscribe();
  }
}
