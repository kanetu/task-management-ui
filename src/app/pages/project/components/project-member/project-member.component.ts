import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.scss'],
})
export class ProjectMemberComponent implements OnInit {
  @Input() members: User[] = [];

  constructor() {}

  ngOnInit(): void {}

  handleEditUser(data: any): void {
    console.log(data);
  }
}
