import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { questionIcon } from 'src/app/shared/icons';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-form-fragment',
  templateUrl: './form-fragment.component.html',
  styleUrls: ['./form-fragment.component.scss'],
})
export class FormFragmentComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Output() onUpdateUser = new EventEmitter();
  @Output() onDeactiveUser = new EventEmitter();

  destroyed$ = new Subject();
  questionIcon = questionIcon;
  accountForm = this.formBuilder.group({
    name: [''],
    birthday: [''],
    email: [{ value: '', disabled: true }],
    phoneNumber: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (this.user) {
      this.accountForm.patchValue({
        name: this.user.name,
        birthday: this.user.birthday,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
      });
    }
  }

  onSave(): void {
    this.onUpdateUser.emit(this.accountForm.value);
  }

  handleDeactiveUser(): void {
    this.onDeactiveUser.emit();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
