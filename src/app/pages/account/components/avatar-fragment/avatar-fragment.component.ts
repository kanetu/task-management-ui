import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-avatar-fragment',
  templateUrl: './avatar-fragment.component.html',
  styleUrls: ['./avatar-fragment.component.scss'],
})
export class AvatarFragmentComponent implements OnInit {
  @Input() avatarUrl: string;
  @Output() onUpdateAvatar = new EventEmitter<any>();

  avatarForm = this.formBuilder.group({
    avatarUrl: [''],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  handleSubmit(): void {
    console.log(this.avatarForm.value);
    this.onUpdateAvatar.next(this.avatarForm.value);
  }
}
