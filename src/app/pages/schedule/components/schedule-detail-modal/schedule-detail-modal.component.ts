import { Inject, Input } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Schedule } from 'src/app/shared/models/schedule.model';
import { ScheduleService } from 'src/app/shared/services/schedule.service';

@Component({
  selector: 'app-schedule-detail-modal',
  templateUrl: './schedule-detail-modal.component.html',
  styleUrls: ['./schedule-detail-modal.component.scss'],
})
export class ScheduleDetailModalComponent implements OnInit, OnDestroy {
  @Input() open$: Subject<string>;
  @Input() scheduleEditData$: Subject<Schedule>;
  @Input() processState$: Subject<boolean>;

  scheduleForm = this.formBuilder.group({
    title: [''],
    description: [''],
    place: [''],
    date: [''],
    timeStart: [this.moment()],
    timeEnd: [this.moment()],
  });

  destroyed$ = new Subject();
  scheduleId: string;
  open: boolean;
  openMode: string;
  formatDate = 'DD/MM/YYYY HH:mm';
  constructor(
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    @Inject('MomentWrapper') private moment: any,
  ) {}

  ngOnInit(): void {
    this.open$
      .pipe(
        takeUntil(this.destroyed$),
        map((data) => {
          if (data === 'ADD') {
            this.openMode = 'ADD';
          }
          this.openMode = data;
          this.open = ['EDIT', 'ADD'].includes(data);
          console.log(data);
        }),
      )
      .subscribe();

    this.scheduleEditData$
      .pipe(
        takeUntil(this.destroyed$),
        map((data) => {
          this.scheduleId = data.id;

          this.scheduleForm.patchValue({
            title: data.title,
            description: data.description,
            place: data.place,
            timeStart: data.timeStart,
            timeEnd: data.timeEnd,
          });
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  handleSave(): void {
    // const timeStart = this.moment(
    //   this.scheduleForm.controls['timeStart'].value,
    //   this.formatDate,
    // );

    // const timeEnd = this.moment(
    //   this.scheduleForm.controls['timeEnd'].value,
    //   this.formatDate,
    // );
    if (this.openMode === 'ADD') {
      this.scheduleService
        .createSchedule({ ...this.scheduleForm.value })
        .pipe(
          takeUntil(this.destroyed$),
          tap(() => {
            this.processState$.next(true);
          }),
        )
        .subscribe();
    } else {
      this.scheduleService
        .updateSchedule(this.scheduleId, {
          ...this.scheduleForm.value,
          // timeStart,
          // timeEnd,
        })
        .pipe(
          takeUntil(this.destroyed$),
          tap(() => {
            this.processState$.next(true);
          }),
        )
        .subscribe();
    }
    this.open$.next('CLOSE');
  }

  handleCancel(): void {
    this.open$.next('CLOSE');
  }
}
