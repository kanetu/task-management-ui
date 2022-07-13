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
import { ModalComponent } from './components/modal/modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import * as moment from 'moment';
import { UserItemComponent } from './components/user-item/user-item.component';
import { CommentComponent } from './components/comment/comment.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { ContenteditableValueAccessor } from './directives/contenteditable.directive';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { RemoveHtmlPipe } from './pipes/remove-html.pipe';
import { SantinizerPipe } from './pipes/santinizer.pipe';

@NgModule({
  declarations: [
    OneColumnComponent,
    HeaderComponent,
    TwoColumnComponent,
    ModalComponent,
    DropdownComponent,
    UserItemComponent,
    CommentComponent,
    CustomDatePipe,
    SantinizerPipe,
    ContenteditableValueAccessor,
    SvgIconComponent,
    RemoveHtmlPipe,
    CommentItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NzIconModule,
    NzDropDownModule,
    NzDividerModule,
    NzModalModule,
    NzSelectModule,
  ],
  providers: [
    {
      provide: 'MomentWrapper',
      useValue: moment,
    },
  ],
  exports: [
    ContenteditableValueAccessor,
    OneColumnComponent,
    TwoColumnComponent,
    HeaderComponent,
    ModalComponent,
    NzButtonModule,
    NzSelectModule,
    NzTabsModule,
    NzInputModule,
    NzCalendarModule,
    NzBadgeModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzToolTipModule,
    NzIconModule,
    NzDropDownModule,
    NzDividerModule,
    NzModalModule,
    ReactiveFormsModule,
    UserItemComponent,
    CommentComponent,
    SvgIconComponent,
    CustomDatePipe,
    SantinizerPipe,
    RemoveHtmlPipe,
  ],
})
export class SharedModule {}
