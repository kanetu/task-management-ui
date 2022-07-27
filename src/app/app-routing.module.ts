import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './auth/guards/role.guard';
import { ViewAccountGuard } from './auth/guards/view-account.guard';
import { ViewProjectGuard } from './auth/guards/view-project.guard';
import { ViewScheduleGuard } from './auth/guards/view-schedule.guard';
import { ViewUserGuard } from './auth/guards/view-user.guard';
import { USER_PERMISSIONS } from './constants/user-permissions';
const permissions = JSON.parse(localStorage.getItem(USER_PERMISSIONS) || '[]');

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
    canActivate: [ViewProjectGuard],
    data: {
      permissions: permissions,
    },
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then((m) => m.UserModule),
    canActivate: [ViewUserGuard],
    data: {
      permissions: permissions,
    },
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./pages/schedule/schedule.module').then((m) => m.ScheduleModule),
    canActivate: [ViewScheduleGuard],
    data: {
      permissions: permissions,
    },
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account.module').then((m) => m.AccountModule),
    canActivate: [ViewAccountGuard],
    data: {
      permissions: permissions,
    },
  },
  {
    path: 'welcome',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
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
