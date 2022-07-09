import { Component, Input, OnInit } from '@angular/core';
import { configIcon } from '../../icons';

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
