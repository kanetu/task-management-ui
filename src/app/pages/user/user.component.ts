import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  destroyed$ = new Subject();
  payload = {
    paging: {
      pageIndex: 0,
      pageSize: 100,
    },
    keyword: '',
  };
  users$: Observable<User[]> = this.userService.filterUser(this.payload).pipe(
    takeUntil(this.destroyed$),
    map((result) => {
      const { data } = result;
      return data;
    }),
  );

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  handleEditUser(data: any): void {
    console.log(data);
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
