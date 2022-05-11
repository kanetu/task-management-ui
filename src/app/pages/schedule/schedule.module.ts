import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { ScheduleDetailModalComponent } from './components/schedule-detail-modal/schedule-detail-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleAccorditionComponent } from './components/schedule-accordition/schedule-accordition.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleDetailModalComponent,
    ScheduleAccorditionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
    SharedModule,
  ],
  exports: [
    ScheduleComponent,
    ScheduleDetailModalComponent,
    ScheduleAccorditionComponent,
  ],
})
export class ScheduleModule {}
