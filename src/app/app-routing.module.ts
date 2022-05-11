import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './auth/guards/role.guard';

const routes: Routes = [
  {
    path: 'task',
    loadChildren: () =>
      import('./pages/task/task.module').then((m) => m.TaskModule),
    canActivate: [RoleGuard],
    data: {
      role: 'user',
    },
  },
  {
    path: 'project',
    loadChildren: () =>
      import('./pages/project/project.module').then((m) => m.ProjectModule),
    canActivate: [RoleGuard],
    data: {
      role: 'user',
    },
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then((m) => m.UserModule),
    canActivate: [RoleGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./pages/schedule/schedule.module').then((m) => m.ScheduleModule),
    canActivate: [RoleGuard],
    data: {
      role: 'user',
    },
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account.module').then((m) => m.AccountModule),
    data: {
      role: 'user',
    },
  },
  {
    path: 'welcome',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
