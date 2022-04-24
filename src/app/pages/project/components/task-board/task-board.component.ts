import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap, timeout } from 'rxjs/operators';
import { Project } from 'src/app/shared/models/project.model';
import { Task } from 'src/app/shared/models/task.model';
import { ProjectService } from 'src/app/shared/services/project.service';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent implements OnInit {
  @ViewChild('taskBoardWrapper', { static: true }) taskBoardWrapper: ElementRef;
  @ViewChild('scrollbarPseudo', { static: true }) scrollbarPseudo: ElementRef;
  taskNewData: Task[] = [];
  taskInProcessingData: Task[] = [];
  taskResolveData: Task[] = [];
  taskReadyForTestData: Task[] = [];
  taskCloseData: Task[] = [];

  destroyed$ = new Subject();
  openModal$: Subject<string> = new Subject();
  taskEdit$: Subject<Task> = new Subject<Task>();
  processState$ = new Subject();

  constructor(
    private activateRoute: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const projectId = this.activateRoute.snapshot.paramMap.get('projectId');

    if (projectId) {
      this.projectService
        .getProject(projectId)
        .pipe(
          takeUntil(this.destroyed$),
          map((project) => this.dettachTaskBaseStatus(project)),
        )
        .subscribe();

      this.processState$
        .pipe(
          switchMap(() =>
            this.projectService
              .getProject(projectId)
              .pipe(map((project) => this.dettachTaskBaseStatus(project))),
          ),
        )
        .subscribe();
    }
  }

  ngAfterViewInit() {
    console.log('this->', this.taskBoardWrapper.nativeElement.clientWidth);
    this.scrollbarPseudo.nativeElement.style.width =
      this.taskBoardWrapper.nativeElement.clientWidth;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.destroyed$.complete();
  }

  dettachTaskBaseStatus(project: Project): void {
    this.taskNewData = project.tasks.filter((task) => task.status === 'New');
    this.taskInProcessingData = project.tasks.filter(
      (task) => task.status === 'In processing',
    );
    this.taskResolveData = project.tasks.filter(
      (task) => task.status === 'Resolve',
    );
    this.taskReadyForTestData = project.tasks.filter(
      (task) => task.status === 'Ready for test',
    );
    this.taskCloseData = project.tasks.filter(
      (task) => task.status === 'Close',
    );
  }

  get taskBoardIds() {
    return [
      'dropListNew',
      'dropListInProcessing',
      'dropListResolve',
      'dropListReadyForTest',
      'dropListClose',
    ];
  }

  mapTableWithStatus(table: string): string {
    const status = table.split('dropList')[1];
    switch (status) {
      case 'InProcessing':
        return 'In processing';
      case 'ReadyForTest':
        return 'Ready for test';
      default:
        return status;
    }
  }

  onTaskDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      this.taskService
        .updateTask(event.item.data.id, {
          status: this.mapTableWithStatus(event.container.id),
        })
        .pipe(
          takeUntil(this.destroyed$),
          map(() => {
            this.processState$.next(true);
          }),
        )
        .subscribe();
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  openEditTask(data: any): void {
    this.taskEdit$.next(data);
    this.openModal$.next('EDIT');
  }

  openAddTask(): void {
    this.openModal$.next('ADD');
  }
}
