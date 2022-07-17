import { EventEmitter, Inject, Input, Output } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { errorIcon } from 'src/app/shared/icons';
import { Schedule } from 'src/app/shared/models/schedule.model';
import { ICreateSchedule, IUpdateSchedule } from '../../schedule.component';

@Component({
  selector: 'app-schedule-detail-modal',
  templateUrl: './schedule-detail-modal.component.html',
  styleUrls: ['./schedule-detail-modal.component.scss'],
})
export class ScheduleDetailModalComponent implements OnInit, OnDestroy {
  @Input() open$: Subject<string>;
  @Input() scheduleEditData$: Subject<Schedule>;
  @Input() processState$: Subject<boolean>;

  @Output() onCreateSchedule = new EventEmitter<ICreateSchedule>();
  @Output() onUpdateSchedule = new EventEmitter<IUpdateSchedule>();

  scheduleForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: [''],
    place: ['', [Validators.required]],
    date: [],
    timeStart: [],
    timeEnd: [],
  });

  get f() {
    return this.scheduleForm.controls;
  }

  errorIcon = errorIcon;
  destroyed$ = new Subject();
  allowSubmit = false;
  scheduleId: string;
  open: boolean;
  openMode: string;

  constructor(
    private formBuilder: FormBuilder,
    @Inject('MomentWrapper') private moment: any,
  ) {}

  ngOnInit(): void {
    console.log(
      this.moment()
        .add(30 - (this.moment().minute() % 30), 'minutes')
        .toDate(),
    );
    this.scheduleForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => {
          this.allowSubmit = this.scheduleForm.valid;
        }),
      )
      .subscribe();

    this.open$
      .pipe(
        takeUntil(this.destroyed$),
        map((data) => {
          if (data === 'ADD') {
            this.openMode = 'ADD';
            this.scheduleForm.patchValue({
              date: this.moment().toDate(),
              timeStart: this.moment()
                .add(30 - (this.moment().minute() % 30), 'minutes')
                .toDate(),
              timeEnd: this.moment()
                .add(30 - (this.moment().minute() % 30), 'minutes')
                .add(30, 'minutes')
                .toDate(),
            });
          }

          this.openMode = data;
          this.open = ['EDIT', 'ADD'].includes(data);
          if (!['EDIT', 'ADD'].includes(data)) {
            this.scheduleForm.reset();
          }
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
    if (this.openMode === 'ADD') {
      this.onCreateSchedule.emit(this.scheduleForm.value);
      this.scheduleForm.reset();
    } else {
      this.onUpdateSchedule.emit({
        scheduleId: this.scheduleId,
        formValue: this.scheduleForm.value,
      });
    }
    this.open$.next('CLOSE');
  }

  disabledDate(current: Date): boolean {
    const today = new Date();
    current.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return current.getTime() < today.getTime();
  }

  handleCancel(): void {
    this.open$.next('CLOSE');
  }
}
