import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { commentIcon, expandIcon, linkIcon } from 'src/app/shared/icons';
import { Task } from 'src/app/shared/models/task.model';
import detectLink from 'src/app/shared/utils/detectLink';

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
  expandIcon = expandIcon;
  commentIcon = commentIcon;
  linkIcon = linkIcon;
  linkCounts = 0;
  constructor() {}

  ngOnInit(): void {
    this.data = {
      ...this.data,
      description:
        this.data.description.length > 130
          ? this.data.description.slice(0, 130) + '...'
          : this.data.description.slice(0, 130),
    };

    this.linkCounts = detectLink(
      [
        this.data.description,
        ...this.data.comments.map((item) => item.content),
      ].join(' '),
    );

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
