import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OneColumnComponent } from './layouts/one-column/one-column.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TwoColumnComponent } from './layouts/two-column/two-column.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  declarations: [OneColumnComponent, HeaderComponent, TwoColumnComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NzIconModule,
    NzDropDownModule,
    NzDividerModule,
  ],
  exports: [OneColumnComponent, TwoColumnComponent, HeaderComponent],
})
export class SharedModule {}
