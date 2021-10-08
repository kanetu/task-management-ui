import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {Task} from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  taskNewData: Task[] = [
    {
      id: "1",
      title: "Task's name",
      description: "Specify your library as an import (set timeout to -1 for unlimited timeout, the message can only be closed by the user clicking on",
      estimate: 1,
      remaining: 2,
      complete: 2,
      status: "New",
    }
  ];

  taskInProcessingData: Task[] = [];
  taskResolveData: Task[] = [];
  taskReadyForTestData: Task[] = [];
  taskCloseData: Task[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  get taskBoardIds() {
    return [
      "dropListNew",
      "dropListInProcessing",
      "dropListResolve",
      "dropListReadyForTest",
      "dropListClose"
    ];
  }

  onTaskDrop(event: CdkDragDrop<any>){
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    }else{
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
