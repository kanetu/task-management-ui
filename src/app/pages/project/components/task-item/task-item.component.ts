import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';

interface IMemberAvatar {
  id: string;
  url: string;
}

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() data: Task;
  @Input() processState$: Subject<any>;
  @Output() editTask = new EventEmitter<any>();
  memberAvatars: IMemberAvatar[] = [];

  constructor() {}

  ngOnInit(): void {
    this.memberAvatars = [
      { url: this.data.assignTo?.avatarUrl, id: this.data.assignTo?.id },
      ...this.data.comments.map((item) => ({
        url: item.user?.avatarUrl,
        id: item.user?.id,
      })),
    ].reduce((acc, cur): IMemberAvatar[] => {
      const currentUrls = acc.map((i) => i.id);
      if (!currentUrls.includes(cur.id)) {
        acc.push(cur);
      }
      return acc;
    }, <IMemberAvatar[]>[]);
  }

  handleEditTask(): void {
    this.editTask.emit(this.data);
  }
}
