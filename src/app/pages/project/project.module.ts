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
import { NzRadioModule } from 'ng-zorro-antd/radio';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectItemComponent,
    TaskBoardComponent,
    TaskItemComponent,
    TaskDetailModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NzIconModule,
    NzModalModule,
    NzRadioModule,
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
