import { EventEmitter, Inject, Input, Output } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
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
    title: [''],
    description: [''],
    place: ['London'],
    date: [new Date()],
    timeStart: [
      this.moment().add(30 - (this.moment().minute() % 30), 'minutes'),
    ],
    timeEnd: [
      this.moment()
        .add(30 - (this.moment().minute() % 30), 'minutes')
        .add(30, 'minutes'),
    ],
  });

  destroyed$ = new Subject();
  scheduleId: string;
  open: boolean;
  openMode: string;

  constructor(
    private formBuilder: FormBuilder,
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
      this.onCreateSchedule.emit(this.scheduleForm.value);
    } else {
      this.onUpdateSchedule.emit({
        scheduleId: this.scheduleId,
        formValue: this.scheduleForm.value,
      });
    }
    this.open$.next('CLOSE');
  }

  handleCancel(): void {
    this.open$.next('CLOSE');
  }

  changeInput(input: HTMLTextAreaElement): void {
    input.style.height = '';
    input.style.height = input.scrollHeight + 'px';
  }
}
