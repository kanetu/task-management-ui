import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  destroyed$ = new Subject();
  reFetch$ = new Subject();
  user$: Observable<User> = this.reFetch$.pipe(
    takeUntil(this.destroyed$),
    delay(200),
    startWith(true),
    switchMap(() =>
      this.userService.getUser().pipe(
        takeUntil(this.destroyed$),
        map((result) => result.data),
      ),
    ),
  );

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  handleUpdateAvatar($event: { avatarUrl: string }): void {
    const { avatarUrl } = $event;
    this.userService
      .updateAvatar({ avatarUrl })
      .pipe(takeUntil(this.destroyed$))
      .subscribe();

    this.reFetch$.next();
  }

  handleUpdateUser($event: {
    name: string;
    birthday: string;
    phoneNumber: string;
  }): void {
    const { name, birthday, phoneNumber } = $event;
    this.userService
      .updateUser({ name, birthday, phoneNumber })
      .pipe(takeUntil(this.destroyed$))
      .subscribe();

    this.reFetch$.next();
  }

  handleDeactiveUser() {
    this.userService
      .deactiveUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
