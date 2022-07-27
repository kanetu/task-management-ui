import { Component, Input, OnInit } from '@angular/core';
import { PERMISSIONS } from 'src/app/constants/permissions';
import { configIcon } from '../../icons';
import { hasPermission } from '../../utils/hasPermission';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() options = [
    {
      text: 'Account',
      value: '/account',
      disabled: hasPermission(PERMISSIONS.VIEW_ACCOUNT) ? null : true,
    },
    {
      text: 'Logout',
      value: '/logout',
    },
  ];

  configIcon = configIcon;
  constructor() {}

  ngOnInit(): void {}
}
