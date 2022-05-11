import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-fragment',
  templateUrl: './form-fragment.component.html',
  styleUrls: ['./form-fragment.component.scss'],
})
export class FormFragmentComponent implements OnInit {
  accountForm = this.formBuilder.group({
    displayName: [''],
    birthDay: [''],
    emailAddress: [''],
    phoneNumber: [''],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSave(): void {
    console.log(this.accountForm.value);
  }
}
