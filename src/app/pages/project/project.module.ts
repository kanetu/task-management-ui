import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectRoutingModule } from './project-routing.module';
import {ProjectComponent} from './project.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectItemComponent,
    TaskBoardComponent,
    TaskItemComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ProjectRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ProjectComponent,
    ProjectItemComponent,
    TaskBoardComponent
  ]
})
export class ProjectModule { }
