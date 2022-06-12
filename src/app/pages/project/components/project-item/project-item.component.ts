import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit {
  @Input() project: Project;

  projectLetter: string;

  constructor(
    private router: Router,
    @Inject('MomentWrapper') private momentWrapper: any,
  ) {}

  ngOnInit(): void {
    this.projectLetter = this.project.name[0];
    console.log(this.momentWrapper());
  }

  goIntoProject(): void {
    this.router.navigate([`/project/${this.project.id}/view`]);
  }
}
