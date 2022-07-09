import { Component, Input, OnInit } from '@angular/core';
import { arrowIcon } from 'src/app/shared/icons';
import { Schedule } from 'src/app/shared/models/schedule.model';

@Component({
  selector: 'app-schedule-accordition',
  templateUrl: './schedule-accordition.component.html',
  styleUrls: ['./schedule-accordition.component.scss'],
})
export class ScheduleAccorditionComponent implements OnInit {
  @Input() data: Schedule;
  show: boolean = false;
  arrowIcon = arrowIcon;

  constructor() {}

  ngOnInit(): void {}

  toggleAccrod(): void {
    this.show = !this.show;
  }
}
