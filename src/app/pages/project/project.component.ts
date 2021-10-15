import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Project } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projects$ = this.projectService.getAllProject().pipe(
      tap((data) => {
        console.log(data);
      })
    );
  }
}
