import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { UserService } from 'src/app/shared/services/user.service';

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
  payload = {
    paging: {
      pageIndex: 0,
      pageSize: 100,
    },
    keyword: '',
  };

  users$ = this.userService.filterUser(this.payload).pipe(
    takeUntil(this.destroyed$),
    map(({ data }) => data),
  );

  taskForm = this.formBuilder.group({
    title: [''],
    description: [''],
    assignTo: [''],
    priority: [''],
    status: [''],
    estimate: [''],
    complete: [''],
    remaining: [''],
  });

  listOfStatus = [
    { label: 'New', value: 'NEW' },
    { label: 'In processing', value: 'IN_PROCESSING' },
    { label: 'Resolve', value: 'RESOLVE' },
    { label: 'Close', value: 'CLOSE' },
    { label: 'Ready for test', value: 'READY_FOR_TEST' },
  ];

  listOfPriority = [
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' },
    { label: 'Critical', value: 'CRITICAL' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private activateRoute: ActivatedRoute,
    private userService: UserService,
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
        }),
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
            assignTo: data.assignTo.id,
            priority: data.priority,
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
      this.taskService
        .createTask(this.projectId, this.taskForm.value)
        .pipe(
          takeUntil(this.destroyed$),
          map(() => {
            this.processState$.next(true);
          }),
        )
        .subscribe();
    } else {
      this.taskService
        .updateTask(this.taskId, this.taskForm.value)
        .pipe(
          takeUntil(this.destroyed$),
          map(() => {
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

  handleSendComment(data: { content: string }): void {
    console.log('this->', data);
  }
}
