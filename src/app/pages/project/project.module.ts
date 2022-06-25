import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskDetailModalComponent } from './components/task-detail-modal/task-detail-modal.component';
import { ProjectBoardComponent } from './components/project-board/project-board.component';
import { ProjectMemberComponent } from './components/project-member/project-member.component';
import { ProjectAboutComponent } from './components/project-about/project-about.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectItemComponent,
    TaskBoardComponent,
    TaskItemComponent,
    TaskDetailModalComponent,
    ProjectBoardComponent,
    ProjectMemberComponent,
    ProjectAboutComponent,
  ],
  imports: [CommonModule, SharedModule, DragDropModule, ProjectRoutingModule],
  exports: [
    ProjectComponent,
    ProjectItemComponent,
    TaskBoardComponent,
    TaskItemComponent,
  ],
})
export class ProjectModule {}
