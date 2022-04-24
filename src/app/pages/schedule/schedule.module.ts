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
import { ScheduleAccorditionComponent } from './components/schedule-accordition/schedule-accordition.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleTableComponent,
    ScheduleDetailModalComponent,
    ScheduleAccorditionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzIconModule,
    NzModalModule,
    NzCalendarModule,
    NzBadgeModule,
  ],
  exports: [
    ScheduleComponent,
    ScheduleTableComponent,
    ScheduleDetailModalComponent,
    ScheduleAccorditionComponent,
  ],
})
export class ScheduleModule {}
