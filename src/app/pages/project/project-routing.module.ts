import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskBoardComponent} from './components/task-board/task-board.component';
import {ProjectComponent} from './project.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ProjectComponent
      },
      {
        path: ":projectId/task",
        component: TaskBoardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
