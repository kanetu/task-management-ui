import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Project } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  payload = {
    paging: {
      pageIndex: 0,
      pageSize: 100,
    },
    keyword: '',
  };

  projects$: Observable<Project[]> = this.projectService
    .filterProject(this.payload)
    .pipe(
      takeUntil(this.destroyed$),
      map((result) => {
        const data: Project[] = result.data.map((project) => ({
          ...project,
          createAt: this.momentWrapper(project.createAt).format('DD/MM/YYYY'),
          updateAt: this.momentWrapper(project.updateAt).format('DD/MM/YYYY'),
        }));
        return data;
      }),
    );

  constructor(
    @Inject('MomentWrapper') private momentWrapper: any,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
