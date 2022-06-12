import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();

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
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: any) => {
        if (data.status) {
          this.router.navigate(['/project']);
        }
      });
  }
}
