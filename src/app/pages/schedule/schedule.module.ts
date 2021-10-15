import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ScheduleTableComponent } from './components/schedule-table/schedule-table.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ScheduleDetailModalComponent } from './components/schedule-detail-modal/schedule-detail-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleTableComponent,
    ScheduleDetailModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzIconModule,
    NzModalModule,
  ],
  exports: [
    ScheduleComponent,
    ScheduleTableComponent,
    ScheduleDetailModalComponent,
  ],
})
export class ScheduleModule {}
