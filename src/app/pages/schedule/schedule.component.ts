import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Schedule } from 'src/app/shared/models/schedule.model';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private scheduleService: ScheduleService) {}

  schedules$ = new Subject<Schedule[]>();
  openModal$ = new Subject<string>();
  scheduleEditData$ = new Subject<Schedule>();
  processState$ = new Subject<boolean>();
  destroyed$ = new Subject();

  selectedValue = new Date();

  selectChange(select: Date): void {
    console.log(`Select value: ${select}`);
  }

  panelChange(select: any): void {
    console.log(`this->`, select);
  }
  listDataMap = {
    eight: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'success', content: 'This is usual event.' },
    ],
  };

  ngOnInit(): void {
    this.processState$
      .pipe(
        takeUntil(this.destroyed$),
        switchMap(() =>
          this.scheduleService
            .getSchedules()
            .pipe(map((data) => this.schedules$.next(this.formatData(data)))),
        ),
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.processState$.next(true);
  }
  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  formatData(data: Schedule[]): Schedule[] {
    const formatDateTime = 'DD/MM/YYYY HH:mm';
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

  openAddSchedule(): void {
    this.openModal$.next('ADD');
  }
}
