import { Component, OnInit } from '@angular/core';
import { projectIcon, scheduleIcon, userIcon } from '../../icons';

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

  constructor() {}

  onShowMenuOptions() {
    this.showMenuOptions = !this.showMenuOptions;
  }

  ngOnInit(): void {}
}
