import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  map,
} from 'rxjs/operators';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() data: Task;
  @Input() processState$: Subject<any>;
  @Output() editTask = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {}

  taskForm = this.formBuilder.group({
    estimate: [''],
    complete: [''],
    remaining: [''],
  });

  ngOnInit(): void {
    this.taskForm.patchValue({
      estimate: this.data.estimate,
      complete: this.data.complete,
      remaining: this.data.remaining,
    });
    this.taskForm
      .get('estimate')
      ?.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((estimate: number, index: number) => {
          return this.taskService.updateTask(this.data.id, {
            estimate: Number(estimate),
          });
        }),
        map(() => {
          this.processState$.next(true);
        })
      )
      .subscribe();

    this.taskForm
      .get('complete')
      ?.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((complete: number, index: number) => {
          return this.taskService.updateTask(this.data.id, {
            complete: Number(complete),
          });
        }),
        map(() => {
          this.processState$.next(true);
        })
      )
      .subscribe();

    this.taskForm
      .get('remaining')
      ?.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((remaining: number, index: number) => {
          return this.taskService.updateTask(this.data.id, {
            remaining: Number(remaining),
          });
        }),
        map(() => {
          this.processState$.next(true);
        })
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  handleEditTask(): void {
    this.editTask.emit(this.data);
  }
}
