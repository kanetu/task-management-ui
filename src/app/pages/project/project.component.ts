import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(
    @Inject('MomentWrapper') private momentWrapper: any,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    const payload = {
      paging: {
        pageIndex: 0,
        pageSize: 100,
      },
      keyword: '',
    };
    this.projects$ = this.projectService.filterProject(payload).pipe(
      map((result) => {
        const data: Project[] = result.data.map((project) => ({
          ...project,
          createAt: this.momentWrapper(project.createAt).format('DD/MM/YYYY'),
          updateAt: this.momentWrapper(project.updateAt).format('DD/MM/YYYY'),
        }));
        return data;
      }),
    );
  }
}
