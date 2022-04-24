import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() data: Task;
  @Input() processState$: Subject<any>;
  @Output() editTask = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  handleEditTask(): void {
    this.editTask.emit(this.data);
  }
}
