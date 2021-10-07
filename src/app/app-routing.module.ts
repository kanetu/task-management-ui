import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "task",
    loadChildren: () => import("./pages/task/task.module").then(m => m.TaskModule)
  },
  {
    path: "project",
    loadChildren: () => import("./pages/project/project.module").then(m => m.ProjectModule)
  },
  {
    path: "user",
    loadChildren: () => import("./pages/user/user.module").then(m => m.UserModule)
  },
  {
    path: "schedule",
    loadChildren: () => import("./pages/schedule/schedule.module").then(m => m.ScheduleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
