import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectBoardComponent } from './components/project-board/project-board.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProjectComponent,
      },
      {
        path: ':projectId/view',
        component: ProjectBoardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
