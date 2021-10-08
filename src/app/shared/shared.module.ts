import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { OneColumnComponent } from './layouts/one-column/one-column.component';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    OneColumnComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    OneColumnComponent
  ]
})
export class SharedModule { }
