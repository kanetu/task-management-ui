import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Schedule } from 'src/app/shared/models/schedule.model';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss'],
})
export class ScheduleTableComponent implements OnInit, OnDestroy {
  @Input() data$: Subject<Schedule[]>;

  @Input() openEditSchedule$: Subject<string>;
  @Input() scheduleEditData$: Subject<Schedule>;
  destroyed$ = new Subject();
  dataSet: Schedule[];
  constructor() {}

  ngOnInit(): void {
    this.data$
      .pipe(
        takeUntil(this.destroyed$),
        map((data) => {
          this.dataSet = data;
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  handleEdit(data: Schedule): void {
    this.scheduleEditData$.next(data);
    this.openEditSchedule$.next('EDIT');
  }
}
