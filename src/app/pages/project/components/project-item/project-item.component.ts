import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit {
  @Input() project: Project;

  shouldShowMember = 2;
  projectLetter: string;
  totalUsers: number;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.projectLetter = this.project.name[0];

    this.totalUsers =
      this.project.users.length -
      this.project.users.slice(0, this.shouldShowMember).length;

    this.project = {
      ...this.project,
      users: this.project.users.slice(0, this.shouldShowMember),
    };
  }

  goIntoProject(): void {
    this.router.navigate([`/project/${this.project.id}/view`]);
  }
}
