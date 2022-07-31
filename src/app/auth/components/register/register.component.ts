import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  registerForm = this.formBuilder.group({
    name: [''],
    email: [''],
    password: [''],
  });

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  handleRegister(): void {
    this.authService
      .register(this.registerForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.router.navigate(['/welcome/login']);
        }
      });
  }
}
