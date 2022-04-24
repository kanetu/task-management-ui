import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TaskDetailModalComponent } from './components/task-detail-modal/task-detail-modal.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ProjectBoardComponent } from './components/project-board/project-board.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectItemComponent,
    TaskBoardComponent,
    TaskItemComponent,
    TaskDetailModalComponent,
    ProjectBoardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NzIconModule,
    NzModalModule,
    NzTabsModule,
    NzSelectModule,
    DragDropModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProjectComponent,
    ProjectItemComponent,
    TaskBoardComponent,
    TaskItemComponent,
  ],
})
export class ProjectModule {}
