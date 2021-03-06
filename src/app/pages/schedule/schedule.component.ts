import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { of, ReplaySubject, Subject } from 'rxjs';
import {
  map,
  scan,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Schedule } from 'src/app/shared/models/schedule.model';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import * as moment from 'moment';
import { SYSTEM_DATE_FORMAT } from 'src/app/constants/date-format';
import rangeDatesOfCalendar from 'src/app/shared/utils/calendar';
import { addIcon } from 'src/app/shared/icons';
import { hasPermission } from 'src/app/shared/utils/hasPermission';
import { PERMISSIONS } from 'src/app/constants/permissions';

export interface ICreateSchedule {
  title: string;
  description: string;
  place: string;
  date: string;
  timeStart: string;
  timeEnd: string;
}

export interface IUpdateSchedule {
  formValue: ICreateSchedule;
  scheduleId: string;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  constructor(
    @Inject('MomentWrapper') private momentWrapper: any,
    private scheduleService: ScheduleService,
  ) {}

  addIcon = addIcon;
  schedules$ = new Subject<Schedule[]>();
  openModal$ = new Subject<string>();
  scheduleEditData$ = new Subject<Schedule>();
  processState$ = new Subject<boolean>();
  destroyed$ = new Subject();
  selectedDate$ = new ReplaySubject<string>(2);

  selectChange(select: Date): void {
    this.selectedDate$.next(
      this.momentWrapper(select).format(SYSTEM_DATE_FORMAT),
    );
  }

  listDataMap: {
    [key: string]: any;
  } = {};

  disabledCreateSchedule = hasPermission(PERMISSIONS.CREATE_SCHEDULE)
    ? null
    : true;

  ngOnInit(): void {
    const [firstDate, lastDate] = rangeDatesOfCalendar(
      this.momentWrapper,
      this.momentWrapper(),
    );

    this.processState$
      .pipe(
        takeUntil(this.destroyed$),
        startWith(true),
        switchMap(() =>
          this.scheduleService
            .getSchedules(this.momentWrapper().format(SYSTEM_DATE_FORMAT))
            .pipe(
              map((result) => {
                this.schedules$.next(this.formatData(result.data));
              }),
            ),
        ),
        switchMap(() =>
          this.scheduleService
            .getSchedulesInRange({
              firstDate,
              lastDate,
            })
            .pipe(
              takeUntil(this.destroyed$),
              tap(({ data }) => {
                this.handleListData(data);
              }),
            ),
        ),
      )
      .subscribe();

    this.selectedDate$
      .pipe(
        takeUntil(this.destroyed$),
        startWith(this.momentWrapper().format(SYSTEM_DATE_FORMAT)),
        scan((acc, curr) => [...acc, curr].slice(-2), <string[]>[]),
        switchMap((data) => {
          if (
            this.momentWrapper(data[0]).format('MM') !==
            this.momentWrapper(data[1]).format('MM')
          ) {
            const [firstDate, lastDate] = rangeDatesOfCalendar(
              this.momentWrapper,
              this.momentWrapper(data[1]),
            );
            return this.scheduleService.getSchedulesInRange({
              firstDate,
              lastDate,
            });
          } else {
            return of({ data: [] });
          }
        }),
        tap(({ data }) => {
          if (data.length > 0) this.handleListData(data);
        }),
      )
      .subscribe();

    this.selectedDate$
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((date) => {
          return this.scheduleService
            .getSchedules(this.momentWrapper().format(date))
            .pipe(
              map((result) => {
                this.schedules$.next(this.formatData(result.data));
              }),
            );
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  handleListData(data: Schedule[]): void {
    this.listDataMap = data.reduce((obj, curr) => {
      const date = this.momentWrapper(curr.timeStart).format(
        SYSTEM_DATE_FORMAT,
      );
      if (!obj[date]) {
        obj[date] = [{ type: 'success', content: curr.description }];
      } else {
        obj[date] = [
          ...obj[date],
          { type: 'success', content: curr.description },
        ];
      }
      return obj;
    }, <{ [key: string]: any }>{});
  }

  handleCreateSchedule(data: ICreateSchedule): void {
    this.scheduleService
      .createSchedule({ ...data })
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => {
          this.processState$.next(true);
        }),
      )
      .subscribe();
  }

  handleUpdateSchedule(data: IUpdateSchedule): void {
    const { scheduleId, formValue } = data;
    this.scheduleService
      .updateSchedule(scheduleId, {
        ...formValue,
      })
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => {
          this.processState$.next(true);
        }),
      )
      .subscribe();
  }

  formatData(data: Schedule[]): Schedule[] {
    const formatDateTime = 'hh:mm A';
    const result = data.map((item) => {
      const creator = item.users.find(
        (user: any) => Number(user.id) === item.creator,
      );
      return {
        ...item,
        timeStart: moment(item.timeStart).format(formatDateTime),
        timeEnd: moment(item.timeEnd).format(formatDateTime),
        creator: creator.name,
      };
    });
    return result;
  }

  formatDate(date: Date): string {
    return this.momentWrapper(date).format(SYSTEM_DATE_FORMAT);
  }

  openAddSchedule(): void {
    this.openModal$.next('ADD');
  }

  trackById(_: number, item: Schedule) {
    return item.id;
  }
}
