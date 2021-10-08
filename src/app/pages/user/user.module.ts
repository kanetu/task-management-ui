import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserItemComponent } from './components/user-item/user-item.component';
import {UserComponent} from './user.component';


@NgModule({
  declarations: [
    UserComponent,
    UserItemComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    UserComponent,
    UserItemComponent
  ]
})
export class UserModule { }
