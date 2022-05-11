import { Component, Input, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}
}
