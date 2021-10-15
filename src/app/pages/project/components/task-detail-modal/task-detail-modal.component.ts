import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil, takeWhile } from 'rxjs/operators';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
})
export class TaskDetailModalComponent implements OnInit, OnDestroy {
  @Input() isVisible: boolean = false;
  @Input() task$: Subject<Task>;
  @Input() open$: Subject<string>;
  @Input() processState$: Subject<any>;

  taskId: string;
  open: boolean;
  taskTitle: string;
  destroyed$ = new Subject();
  openMode: string;
  projectId: string;

  taskForm = this.formBuilder.group({
    title: [''],
    description: [''],
    status: [''],
    estimate: [''],
    complete: [''],
    remaining: [''],
  });
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectId =
      this.activateRoute.snapshot.paramMap.get('projectId') || '';

    this.open$
      .pipe(
        takeUntil(this.destroyed$),
        map((data) => {
          this.open = ['EDIT', 'ADD'].includes(data);
          if (data === 'ADD') {
            this.taskForm.reset();
            this.taskForm.patchValue({
              status: 'New',
              estimate: 0,
              remaining: 0,
              complete: 0,
            });
            this.taskTitle = 'Add Task';
          }

          this.openMode = data;
        })
      )
      .subscribe();

    this.task$
      .pipe(
        takeUntil(this.destroyed$),
        map((data) => {
          this.taskId = data.id;
          this.taskTitle = `Task: ${data.title}`;

          this.taskForm.patchValue({
            title: data.title,
            description: data.description,
            status: data.status,
            estimate: data.estimate,
            complete: data.complete,
            remaining: data.remaining,
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  handleSave(): void {
    if (this.openMode === 'ADD') {
      this.taskService
        .createTask(this.projectId, this.taskForm.value)
        .pipe(
          takeUntil(this.destroyed$),
          map(() => {
            this.processState$.next(true);
          })
        )
        .subscribe();
    } else {
      this.taskService
        .updateTask(this.taskId, this.taskForm.value)
        .pipe(
          takeUntil(this.destroyed$),
          map(() => {
            this.processState$.next(true);
          })
        )
        .subscribe();
    }
    this.open$.next('CLOSE');
  }

  handleCancel(): void {
    this.open$.next('CLOSE');
  }
}