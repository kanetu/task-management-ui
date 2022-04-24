import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) {}

  project$: Observable<Project> = this.projectService.getProject(
    this.route.snapshot.paramMap.get('projectId') || '',
  );

  ngOnInit(): void {}
}
