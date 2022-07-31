import { Component, OnInit } from '@angular/core';
import { PERMISSIONS } from 'src/app/constants/permissions';
import { USER_INFO } from 'src/app/constants/user';
import { projectIcon, scheduleIcon, userIcon } from '../../icons';
import { hasPermission } from '../../utils/hasPermission';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showMenuOptions: boolean = false;

  projectIcon = projectIcon;
  userIcon = userIcon;
  scheduleIcon = scheduleIcon;

  disabledViewProject = hasPermission(PERMISSIONS.VIEW_PROJECT) ? null : true;
  disabledViewUser = hasPermission(PERMISSIONS.VIEW_USER) ? null : true;
  disabledViewSchedule = hasPermission(PERMISSIONS.VIEW_SCHEDULE) ? null : true;

  userInfo = JSON.parse(localStorage.getItem(USER_INFO) || '""');

  constructor() {}

  onShowMenuOptions() {
    this.showMenuOptions = !this.showMenuOptions;
  }

  ngOnInit(): void {}
}
